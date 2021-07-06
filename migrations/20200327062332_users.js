exports.up = function (knex) {
	return knex.schema.hasTable("users").then(exists => {
		if (!exists) {
			return knex.schema.createTable("users", table => {
				table.increments("id").primary()
				table.string("username", 20).unique().notNullable()
				table.string("email").unique().notNullable()
				table.string("password").notNullable()
				table.string("first_name", 100)
				table.string("last_name", 100).defaultTo("")
				table.string("status")
				table.string("url")
				table.text("about")
				table.string("profile_image")
				table.string("cover_image")
				table.integer("priv").defaultTo(0)
				table.text("billing_details") //stringify json object
				// table.text("shipping_details") //stringify json object
				table.string("account_status").defaultTo("unverified") //options - unverified, active, inactive, disabled, blacklisted

				/* same feilds needed for billing and shipping details */
				// table.string("company_name", 100)
				// table.string("address_1")
				// table.string("address_2")
				// table.string("phone")
				// table.string("country", 50)
				// table.string("city", 50)
				// table.string("state", 50)
				// table.string("postcode", 20)
				/* same feilds needed for billing and shipping details */

				table.datetime("last_active").defaultTo(knex.fn.now())
				table.timestamps(true, true)
			})
		}
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("users")
}
