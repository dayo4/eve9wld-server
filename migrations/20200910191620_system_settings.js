exports.up = function (knex) {
    return knex.schema.hasTable("system_settings").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("system_settings", (table) => {
                table.boolean("allow_new_reg").defaultTo(false)
                table.string("support_mail")
                table.datetime("timezone")
                table.string("default_role").defaultTo("user")
            })
        }
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("system_settings")
}
