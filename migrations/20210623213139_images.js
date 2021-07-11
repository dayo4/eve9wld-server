exports.up = function (knex) {
    return knex.schema.hasTable("images").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("images", (table) => {
                table.increments("id").primary()
                table.string("url").notNullable()
                table.string("name")
                table.string("caption")
                // table.string("type"); //user
                table.string("description")
                table.string("alt")
                table
                    .integer("user_id")
                    .unsigned()
                    .references("id")
                    .inTable("users")
                    .onUpdate("CASCADE")//.onDelete('SET NULL')
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("images")
}
