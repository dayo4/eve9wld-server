const { knex, path, fsx, hlp } = require("../../../plugins")

module.exports = {
    async create(request, reply) {
        const user_id = request.params.user_id
        function data() {
            return ({
                title,
                slug,
                excerpt,
                content,
                images,
                status,
                categories,
                tags,
                allow_comment,
            } = request.body)
        }

        // const contentImages = request.body.contentImages
        // const content = sanitizeHTML(request.body.content)
        // const data = ({ title, slug, content } = request.body);

        try {
            const created = await knex("posts").insert({ ...data, user_id }, ["slug", "id"])
            // if (contentImages)
            // {
            //     await knex('posts_images')
            //         .insert({ urls: JSON.stringify(contentImages), user_id: user_id, post_id: post_id })
            // }

            return created
        } catch (e) {
            hlp.error(e)
        }
    },

    async findAll(request, reply) {
        const query = JSON.parse(request.params.query)
        const limit = query.limit
        const offset = query.offset
        const filter = query.filter
        const sort = query.sort /* string e.g: 'desc' */

        async function fetchPostUser(post) {
            const user = await knex
                .select("profile_image", "username", "first_name", "last_name")
                .from("users")
                .where("id", post.user_id)
                .first()
            const commentCount = await knex("posts_comments").where("post_id", post.id).count()
            if (user) {
                return {
                    ...post,
                    user,
                    comments: commentCount[0]["count(*)"],
                }
            }
        }

        try {
            const fetchedPosts = await knex
                .select(
                    "id",
                    "title",
                    "slug",
                    "excerpt",
                    "content",
                    "images",
                    "status",
                    "categories",
                    "tags",
                    "allow_comment",
                    "votes",
                    "created_at",
                    "updated_at"
                )
                .from("posts")
                .where(filter)
                .orderBy(sort)
                .limit(limit)
                .offset(offset)
            const postCount = await knex("posts").where(filter).count()
            const posts = await Promise.all(
                fetchedPosts.map(async (post) => {
                    return await fetchPostUser(post)
                })
            )

            return { posts, count: postCount[0]["count(*)"] }
        } catch (e) {
            hlp.error(e)
        }
    },

    async findUserPosts(request, reply) {
        const user_id = request.params.user_id
        const query = JSON.parse(request.params.query)
        const limit = query.limit
        const offset = query.offset
        const sort = query.sort
        const filter = query.filter

        try {
            const fetchedPosts = await knex
                .select(
                    "id",
                    "title",
                    "slug",
                    "excerpt",
                    "content",
                    "images",
                    "status",
                    "categories",
                    "tags",
                    "allow_comment",
                    "votes",
                    "created_at",
                    "updated_at"
                )
                .from("posts")
                .where(filter)
                .andWhere({ user_id })
                .orderBy(sort)
                .limit(limit)
                .offset(offset)
            const user = await knex
                .select("profile_image", "first_name", "last_name")
                .from("users")
                .where("id", user_id)
                .first()
            const postCount = await knex("posts").where(filter).andWhere({ user_id }).count()

            const posts = await Promise.all(
                fetchedPosts.map(async (post) => {
                    const commentCount = await knex("posts_comments")
                        .where("post_id", post.id)
                        .count()
                    return {
                        ...post,
                        user: user,
                        comments: commentCount[0]["count(*)"],
                    }
                })
            )
            return { posts, count: postCount[0]["count(*)"] }
        } catch (e) {
            hlp.error(e)
        }
    },

    async findSettingsPost(request, reply) {
        const user_id = request.params.user_id
        const query = JSON.parse(request.body.query)
        const limit = query.limit
        const offset = query.offset
        const sort = query.sort
        const filter = query.filter

        try {
            const posts = await knex
                .select("id", "title", "slug", "img", "created_at")
                .from("posts")
                .where({ ...filter, user_id })
                .orderBy(sort)
                .limit(limit)
                .offset(offset)
            const postCount = await knex("posts")
                .where({ ...filter, user_id })
                .count()

            return { posts, count: postCount[0]["count(*)"] }
        } catch (e) {
            hlp.error(e)
        }
    },

    async findOne(request, reply) {
        const slug = request.params.slug
        //   const filter
        // const query = request.params.preview
        //   ? { slug: slug }
        //   : { published: true, slug: slug };
        try {
            const post = await knex
                .select(
                    "id",
                    "title",
                    "slug",
                    "excerpt",
                    "content",
                    "images",
                    "status",
                    "categories",
                    "tags",
                    "allow_comment",
                    "votes",
                    "created_at",
                    "updated_at"
                )
                .from("posts")
                .where(slug)
                .first()
            if (post) {
                const user = await knex
                    .select(
                        "username",
                        "profile_image",
                        "status",
                        "about",
                        "first_name",
                        "last_name"
                    )
                    .from("users")
                    .where("id", post.user_id)
                    .first()
                const commentCount = await knex("posts_comments").where("post_id", post.id).count()
                // const contentImages = await knex("posts_images")
                //   .select("urls")
                //   .where("post_id", post.id)
                //   .first();
                const categories = await knex("categories").where("type", "post")

                return {
                    ...post,
                    user,
                    //   content_images: contentImages ? JSON.parse(contentImages.urls) : [],
                    comments: commentCount[0]["count(*)"],
                    categories,
                }
            } else {
                hlp.error("The requested page could not be located", 404)
            }
        } catch (e) {
            hlp.error(e)
        }
    },

    async update(request, reply) {
        const user_id = request.params.user_id
        const postsIds = request.body.postsIds
        const { title, slug, content, contentImages, published, archived } = request.body

        function data() {
            return ({
                title,
                slug,
                excerpt,
                content,
                images,
                status,
                categories,
                tags,
                allow_comment,
                votes,
            } = request.body)
        }

        let updated = 0
        async function updater(dataToSave) {
            for (const post_id of postsIds) {
                await knex("posts")
                    .where("id", post_id)
                    .andWhere("user_id", user_id)
                    .update(dataToSave)
                updated++
                if (updated === postsIds.length) return "All data successfully updated."
            }
        }

        try {
            const updated = updater(data)
        } catch (e) {
            ;`An Error Occured: ${updated} of ${postsIds.length} updated.`
        }
    },

    async delete(request, reply) {
        const user_id = request.params.user_id
        const postsToDelete = request.body.postsIds

        let deletedPosts = 0
        for (const post_id of postsToDelete) {
            try {
                /* delete posts images */
                // const posts_images = await knex("posts_images")
                //   .select("urls")
                //   .where("post_id", post_id)
                //   .first();

                // if (posts_images) {
                //   JSON.parse(posts_images.urls).forEach((url) => {
                //     const imagePath = path.join(
                //       __dirname,
                //       "../..",
                //       "uploads/images/posts/",
                //       url
                //     );
                //     fsx
                //       .remove(imagePath)
                //       .then(() => {})
                //       .catch((e) => {
                //         hlp.error(e);
                //       });
                //   });
                // }

                // await knex("posts_images").where("post_id", post_id).del();

                /* delete post itself */
                await knex("posts").where("id", post_id).andWhere(user_id).del()

                deletedPosts++

                if (deletedPosts === postsToDelete.length)
                    return `${deletedPosts} of ${postsToDelete.length} posts was deleted successfully.`
            } catch (e) {
                if (deletedPosts > 0)
                    hlp.error(`Only ${deletedPosts} of ${postsToDelete.length} posts was deleted.`)
                else hlp.error("Unable to delete content. No post was deleted.")
            }
        }
    },
}
