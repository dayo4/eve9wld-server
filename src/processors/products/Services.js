const {knex, path, fsx, hlp} = require("../../plugins")

module.exports = {
	async findAll(request, reply) {
		const query = JSON.parse(request.params.query)
		const limit = query.limit
		const offset = query.offset
		// const filter = query.filter
		const sort = query.sort /* string e.g: 'desc' */

		// async function fetchProductReviews(product) {
		// 	const review = await knex
		// .from("products_reviews")
		// .where("product_id", product.id)
		// .first("id", "status", "rating", "review", "verified")

		//   const commentCount = await knex("posts_comments")
		//     .where("post_id", post.id)
		//     .count();
		//   if (user) {
		// return {
		// 	...product,
		// 	review
		//   comments: commentCount[0]["count(*)"],
		// };
		// }
		// }
		try {
			const products = await knex
				.select(
					"id",
					"user_id",
					"name",
					"slug",
					"price",
					"sale_price",
					// "description",
					"short_description",
					"status",
					"average_rating",
					"rating_count",
					"categories",
					"featured_image",
					"images",
					// "upsell_ids",
					// "cross_sell_ids",
					// "related_ids",
					"created_at",
					"updated_at"
				)
				.from("products")
				.where({status: "published"})
				.orderBy(...sort)
				.limit(limit)
				.offset(offset)
			const productsCount = await knex("products").where({status: "published"}).count()
			// const products = await Promise.all(
			// 	fetchedProducts.map(async product => {
			// 		return await fetchProductReviews(product)
			// 	})
			// )

			return {products, count: productsCount[0]["count(*)"]}
		} catch (e) {
			hlp.error(e)
		}
	},

	async findOne(request, reply) {
		const slug = request.params.slug

		try {
			const product = await knex
				.from("products")
				.where("slug", slug)
				.first(
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
					"reviews_count",
					"categories",
					"featured_image",
					"images",
					"upsell_ids",
					"cross_sell_ids",
					"related_ids",
					"created_at",
					"updated_at"
				)

			if (product) {
				const reviews = await knex("products_reviews").where("product_id", product.id)

				return {
					...product,
					reviews
				}
			} else {
				hlp.error("The requested page could not be located", 404)
			}
		} catch (e) {
			hlp.error(e)
		}
	}
}
