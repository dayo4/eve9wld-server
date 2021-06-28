const { knex, path, fsx, bcrypt, hlp } = require("../../../plugins")

module.exports = {
    async findAll(request, reply) {
        const query = JSON.parse(request.params.query)
        const limit = query.limit
        const offset = query.offset
        const filter = query.filter
        const sort = query.sort /* string e.g: 'desc' */

        async function fetchProductReviews(product) {
            const review = await knex
                .select("id", "status", "rating", "review", "verified")
                .from("product_reviews")
                .where("product_id", product.id)
                .first()

            //   const commentCount = await knex("posts_comments")
            //     .where("post_id", post.id)
            //     .count();
            //   if (user) {
            return {
                ...product,
                review,
                //   comments: commentCount[0]["count(*)"],
                // };
            }
        }

        try {
            const fetchedProducts = await knex
                .select(
                    "id",
                    "user_id",
                    "name",
                    "slug",
                    "price",
                    "sale_price",
                    "description",
                    "short_description",
                    "status",
                    "average_rating",
                    "rating_count",
                    "categories",
                    "images",
                    "upsell_ids",
                    "cross_sell_ids",
                    "related_ids",
                    "created_at",
                    "updated_at"
                )
                .from("products")
                .where(filter)
                .orderBy(...sort)
                .limit(limit)
                .offset(offset)
            const productsCount = await knex("products")
                // .where({ published: true })
                .count()
            const products = await Promise.all(
                fetchedProducts.map(async (product) => {
                    return await fetchProductReviews(product)
                })
            )

            return { products, count: productsCount[0]["count(*)"] }
        } catch (e) {
            hlp.error(e)
        }
    },

    async findOne(request, reply) {
        const slug = request.params.slug
        // const query = request.params.preview
        //   ? { slug: slug }
        //   : { published: true, slug: slug };
        try {
            const product = await knex
                .select(
                    "id",
                    "user_id",
                    "name",
                    "slug",
                    "price",
                    "sale_price",
                    "description",
                    "short_description",
                    "status",
                    "average_rating",
                    "rating_count",
                    "categories",
                    "images",
                    "upsell_ids",
                    "cross_sell_ids",
                    "related_ids",
                    "created_at",
                    "updated_at"
                )
                .from("products")
                .where(slug)
                .first()

            if (product) {
                const reviews = await knex("product_reviews").where("product_id", product.id)
                const categories = await knex("categories").where("type", "product")

                return {
                    product,
                    reviews,
                    categories,
                }
            } else {
                hlp.error("The requested page could not be located", 404)
            }
        } catch (e) {
            hlp.error(e)
        }
    },

    async create(request, reply) {
        const user_id = request.params.user_id
        // const title = request.body.title;
        // const slug = request.body.slug;
        // const content = request.body.content;
        // const contentImages = request.body.contentImages;
        // const content = sanitizeHTML(request.body.content)
        // const data = {
        //   title: title,
        //   slug: slug,
        //   content: content,
        // };

        const data = request.body

        try {
            const product_id = await knex("products").insert({ ...data, user_id: user_id }, [
                "slug",
                "id",
            ])
            //   if (contentImages) {
            //     await knex("posts_images").insert({
            //       urls: JSON.stringify(contentImages),
            //       user_id: user_id,
            //       post_id: post_id,
            //     });
            //   }

            return product_id
        } catch (e) {
            hlp.error(e)
        }
    },

    async update(request, reply) {
        // const user_id = request.params.user_id;
        const productIds = request.body.productIds
        // const {
        //   name,
        //   slug,
        //   description,
        //   short_description,
        //   sale_price,
        //   price,
        //   images,
        //   categories,
        //   status,
        // } = request.body;

        let updated = 0
        async function updater(dataToSave) {
            for (const product_id of productIds) {
                await knex("posts")
                    .where("id", product_id)
                    //   .andWhere("user_id", user_id)
                    .update(dataToSave)
                updated++
                if (updated === productIds.length) return "All data successfully updated."
            }
        }

        try {
            const updated = updater(request.body.data)
            return updated
        } catch (e) {
            hlp.error(`An Error Occured: ${updated} of ${productIds.length} updated.`)
        }
    },

    async delete(request, reply) {
        // const user_id = request.params.user_id;
        const productsToDelete = request.body.productIds

        let deletedProducts = 0
        for (const product_id of productsToDelete) {
            try {
                await knex("products").where("id", product_id).del()

                deletedProducts++

                if (deletedProducts === productsToDelete.length)
                    return `${deletedProducts} of ${productsToDelete.length} posts was deleted successfully.`
            } catch (e) {
                if (deletedProducts > 0)
                    hlp.error(
                        `Only ${deletedProducts} of ${productsToDelete.length} posts was deleted.`
                    )
                else hlp.error("Unable to delete content. No post was deleted.")
            }
        }
    },
}
