const { knex, hlp } = require("../../../plugins")

module.exports = {
	async findOne (request) {
		const Uname = request.params.username
		try {
			const fetchedData = await knex
				.from("users")
				.where({
					username: Uname,
					account_status: "active"
				})
				.first(
					"id",
					"profile_image",
					"priv",
					"cover_image",
					"about",
					"username",
					"first_name",
					"last_name",
					"status"
				)

			if (fetchedData) {
				const data = ({
					id,
					profile_image,
					cover_image,
					about,
					username,
					status,
					first_name,
					last_name,
					priv
				} = fetchedData)
				const newData = {
					id,
					profile_image,
					cover_image,
					about,
					username,
					status,
					first_name,
					last_name,
					name: data.first_name + " " + data.last_name,
					pr: data.priv
				}
				return newData
			} else {
				hlp.error("The requested user profile could not be located.", 404)
			}
		} catch (e) {
			hlp.error(e)
		}
	},

}
