const {knex, path, fsx, bcrypt, hlp} = require("../../../plugins")

module.exports = {
	async findAll(request, reply) {
		const query = JSON.parse(request.params.query)
		const limit = query.limit
		const offset = query.offset
		const filter = query.filter
		const sort = query.sort /* string e.g: 'desc' */

		try {
			const posts = await knex
				.select(
					"id",
					"user_id",
					"title",
					"slug",
					"type",
					"content",
					"excerpt",
					"status",
					"tags",
					"featured_image",
					"categories",
					"images",
					"comments_count",
					"created_at",
					"updated_at"
				)
				.from("posts")
				.where(filter)
				.orderBy(...sort)
				.limit(limit)
				.offset(offset)
			const postsCount = await knex("posts").where(filter).count()

			return {posts, count: postsCount[0]["count(*)"]}
		} catch (e) {
			hlp.error(e)
		}
	},

	async findOne(request, reply) {
		const slug = request.params.slug

		try {
			const product = await knex
				.select(
					"id",
					"user_id",
					"title",
					"slug",
					"type",
					"content",
					"excerpt",
					"status",
					"tags",
					"categories",
					"images",
					"comments_count",
					"created_at",
					"updated_at"
				)
				.from("posts")
				.where(slug)
				.first()

			if (product) {
				const comments = await knex("product_reviews").where("post_id", post.id)
				const categories = await knex("categories").where("type", "post")

				return {
					post,
					comments,
					categories
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

		const allowedEntries = [
			"title",
			"slug",
			"type",
			"content",
			"excerpt",
			"status",
			"tags",
			"categories",
			"images"
		]

		const data = {
			user_id
		}

		Object.keys(request.body).forEach(key => {
			if (allowedEntries.includes(key)) data[key] = request.body[key]
		})

		try {
			const post_id = await knex("posts").insert(data)

			return post_id
		} catch (e) {
			hlp.error(e)
		}
	},

	async update(request, reply) {
		// const user_id = request.params.user_id;
		const postsIds = request.body.postsIds
		const allowedEntries = [
			"title",
			"slug",
			"type",
			"content",
			"excerpt",
			"status",
			"tags",
			"categories",
			"images"
		]

		const data = {}

		Object.keys(request.body).forEach(key => {
			if (allowedEntries.includes(key)) data[key] = request.body[key]
		})

		let updated = 0
		async function updater(dataToSave) {
			for (const post_id of postsIds) {
				await knex("posts")
					.where("id", post_id)
					//   .andWhere("user_id", user_id)
					.update(dataToSave)
				updated++
				if (updated === postsIds.length) return "All data successfully updated."
			}
		}

		try {
			const updated = updater(data)
			return updated
		} catch (e) {
			hlp.error(`An Error Occured: ${updated} of ${postsIds.length} updated.`)
		}
	},

	async delete(request, reply) {
		// const user_id = request.params.user_id;
		const postsToDelete = request.body.postsIds

		let deletedPosts = 0
		for (const post_id of postsToDelete) {
			try {
				await knex("posts").where("id", post_id).del()

				deletedPosts++

				if (deletedPosts === postsToDelete.length)
					return `${deletedPosts} of ${postsToDelete.length} posts was deleted successfully.`
			} catch (e) {
				if (deletedPosts > 0)
					hlp.error(`Only ${deletedPosts} of ${postsToDelete.length} posts was deleted.`)
				else hlp.error("Unable to delete content. No post was deleted.")
			}
		}
	}
}
