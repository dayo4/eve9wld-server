const { knex, path, fsx, bcrypt, hlp } = require("../../../plugins")

module.exports = {
	async find (request) {
		const user_id = request.params.user_id
		try {
			const data = await knex("users")
				.where({
					id: user_id,
					account_status: "active" || "unverified"
				})
				.first(
					"id",
					"priv",
					"username",
					"status",
					"about",
					"profile_image",
					"cover_image",
					"first_name",
					"last_name",
					"url",
					// "company_name",
					// "address_1",
					// "address_2",
					// "phone",
					// "country",
					// "city",
					// "state",
					// "postcode",
					"billing_details",
				)

			if (data) {
				data.name = data.first_name + " " + data.last_name
				data.pr = data.priv
				data.billing_details = JSON.parse(data.billing_details)

				return data
			} else {
				hlp.error("The requested user profile could not be located.", 404)
			}
		} catch (e) {
			hlp.error(e)
		}
	},

	async update (request) {
		const user_id = request.params.user_id
		const target = request.body.target
		const allowedEntries = [
			'profile_image',
			'first_name',
			'last_name',
			'about',
			'url',
			// 'company_name',
			// 'country',
			// 'address_1',
			// 'address_2',
			// 'city',
			// 'state',
			// 'postcode',
			// 'company_no',
		]

		try {
			const InitialData = await knex("users")
				.where({
					id: user_id,
					account_status: "active" || "unverified"
				})
				.first(
					"id",
					"priv",
					"username",
					"status",
					"about",
					"profile_image",
					"cover_image",
					"first_name",
					"last_name",
					"url",
					"billing_details",
				)

			if (target === 'BillingInfo') {
				const detail = {
					first_name,
					last_name,
					company_name,
					country,
					address_1,
					address_2,
					city,
					state,
					postcode,
					company_no,
				} = request.body
				const toSave = {
					billing_details: JSON.stringify(detail)
				}
				if (!InitialData.first_name || !InitialData.last_name) {
					toSave[ 'first_name' ] = detail.first_name
					toSave[ 'last_name' ] = detail.last_name
				}


				const updated = await knex("users")
					.where({
						id: user_id,
					}).update(toSave)

				return 'Updated!'
			}
			else if (target === 'pass') {
				const { old_password, new_password } = request.body
				
				const matched = await bcrypt.compare(old_password, InitialData.password)
				if (matched) {
					const hashedPassword = await bcrypt.hash(new_password, 12)

					const updated = await knex("users")
						.where({
							id: user_id,
						}).update({
							password: hashedPassword
						})
					return 'Updated!'
				} else {
					hlp.error("You have entered an incorrect password. Check and try again.", 403)
				}
			}
			else {
				const data = {}

				Object.keys(request.body).forEach(key => {
					if (allowedEntries.includes(key)) data[ key ] = request.body[ key ]
				})

				const updated = await knex
					.from("users")
					.where({
						id: user_id,
					}).update(data)
				return 'Updated!'
			}
		} catch (e) {
			hlp.error(e)
		}
	},

	async delete (request) {
		const id = request.params.id
		try {
			const deleted = await knex("users").where("id", id).del()
			if (deleted) {
				/*also delete all users images uploaded to directories */
				// const url = path.join(__dirname, "../..", "uploads/images/users/" + id)
				// return fsx
				// 	.remove(url)
				// 	.then(() => {
						return "Your Account has been deleted."
					// })
					// .catch(e => {
					// 	hlp.error(e)
					// })
			}
		} catch (e) {
			hlp.error(e, 401)
		}
	}
}
