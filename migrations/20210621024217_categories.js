exports.up = function (knex) {
    return knex.schema.hasTable("categories").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("categories", (table) => {
                table.increments("id").primary()
                table.string("name").notNullable()
                table.string("slug").unique().notNullable()
                table.string("thumbnail")
                table.string("description", 500)
                table.string("type").defaultTo("post") //post, product, page
                table.integer("count")
                table
                    .integer("parent_id")
                    .unsigned()
                    .defaultTo(0)
                    .references("id")
                    .inTable("categories")
                    .onUpdate("CASCADE")
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("categories")
}
