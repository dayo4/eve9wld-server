const {knex, path, fsx, hlp} = require("../../plugins")

module.exports = {
	async findAll(request, reply) {
		const query = JSON.parse(request.params.query)
		const limit = query.limit
		const offset = query.offset
		const sort = query.sort /* string e.g: 'desc' */

		async function fetchPostUser(post) {
			const user = await knex
				.from("users")
				.where("id", post.user_id)
				.first("profile_image", "username", "first_name", "last_name")
			// const commentCount = await knex("posts_comments").where("post_id", post.id).count()
			if (user) {
				return {
					...post,
					user
					// comments: commentCount[0]["count(*)"]
				}
			}
		}

		try {
			const fetchedPosts = await knex
				.select(
					"id",
					"user_id",
					"title",
					"slug",
					"excerpt",
					"content",
					"featured_image",
					"images",
					"categories",
					"tags",
					"votes",
					"created_at",
					"updated_at"
				)
				.from("posts")
				.where({type: "post", status: "published"})
				.orderBy(...sort)
				.limit(limit)
				.offset(offset)
			const postCount = await knex("posts").where({type: "post", status: "published"}).count()
			const posts = await Promise.all(
				fetchedPosts.map(async post => {
					return await fetchPostUser(post)
				})
			)

			return {posts, count: postCount[0]["count(*)"]}
		} catch (e) {
			hlp.error(e)
		}
	},

	async findUserPosts(request, reply) {
		const user_id = request.params.user_id
		const query = JSON.parse(request.params.query)

		try {
			const fetchedPosts = await knex
				.select(
					"id",
					"user_id",
					"title",
					"slug",
					"excerpt",
					"content",
					"featured_image",
					"images",
					"categories",
					"tags",
					"votes",
					"created_at",
					"updated_at"
				)
				.from("posts")
				.where({status: "published", type: "post", user_id})
				.orderBy(...query.sort)
				.limit(query.limit)
				.offset(query.offset)

			const user = await knex
				.from("users")
				.where("id", user_id)
				.first("profile_image", "first_name", "last_name")

			const postCount = await knex("posts").where({status: "published", user_id}).count()

			const posts = await Promise.all(
				fetchedPosts.map(async post => {
					return {
						...post,
						user: user
					}
				})
			)
			return {posts, count: postCount[0]["count(*)"]}
		} catch (e) {
			hlp.error(e)
		}
	},

	async findOne(request, reply) {
		const slug = request.params.slug

		try {
			const post = await knex
				.select(
					"id",
					"user_id",
					"title",
					"slug",
					"excerpt",
					"content",
					"featured_image",
					"images",
					"categories",
					"tags",
					"votes",
					"created_at",
					"updated_at"
				)
				.from("posts")
				.where({slug, type: "post"})
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

				return {
					...post,
					user: user
				}
			} else {
				hlp.error("The requested page could not be located", 404)
			}
		} catch (e) {
			hlp.error(e)
		}
	}
}
