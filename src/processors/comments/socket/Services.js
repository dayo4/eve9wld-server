const {knex, WS, hlp} = require("../../../plugins")

module.exports = {
	async findComments(socket, params) {
		const post_id = params.post_id
		const query = params.query
		const limit = query.limit
		const offset = query.offset
		const sort = query.sort

		async function fetchCommentUser(comment) {
			const user = await knex
				.from("users")
				.where("id", comment.user_id)
				.first("profile_image", "username", "first_name", "last_name")
			const commentsCount = await knex("posts_comments")
				.where("parent_id", comment.id)
				.count()

			return {
				...comment,
				user,
				count: commentsCount[0]["count(*)"]
			}
		}

		try {
			const fetchedComments = await knex
				.select(
					"id",
					"user_id",
					"post_id",
					"parent_id",
					"thumbs_up",
					"thumbs_down",
					"content",
					"created_at"
				)
				.from("posts_comments")
				.where({post_id})
				.orderBy(...sort)
				.limit(limit)
				.offset(offset)
			const commentCount = await knex("posts_comments").where("post_id", post_id).count()

			const comments = await Promise.all(
				fetchedComments.map(async comment => {
					return await fetchCommentUser(comment)
				})
			)
			socket.send(JSON.stringify({comments, count: commentCount[0]["count(*)"]}))
		} catch (e) {
			socket.write(e)
			hlp.error(e)
		}
	},

	async findSubComments(socket, params) {
		const parent_id = params.parent_id
		const query = params.query
		const limit = query.limit
		const offset = query.offset
		const sort = query.sort /* Array of 2 strings e.g ['created_at', 'desc'] */

		async function fetchCommentUser(comment) {
			const user = await knex
				.from("users")
				.where("id", comment.user_id)
				.first("profile_image", "username", "first_name", "last_name")
			if (user) {
				return {
					...comment,
					user
				}
			}
		}

		try {
			const fetchedComments = await knex
				.select(
					"id",
					"user_id",
					"post_id",
					"thumbs_up",
					"thumbs_down",
					"content",
					"created_at"
				)
				.from("posts_comments")
				.where("parent_id", parent_id)
				.orderBy(...sort)
				.limit(limit)
				.offset(offset)
			const commentCount = await knex("posts_comments").where("parent_id", parent_id).count()

			const comments = await Promise.all(
				fetchedComments.map(async comment => {
					return await fetchCommentUser(comment)
				})
			)
			socket.send(JSON.stringify({comments, count: commentCount[0]["count(*)"]}))
		} catch (e) {
			le
			socket.write(e /* 'An error was encountered during request, please retry later.' */)
			hlp.error(e)
		}
	}
}
