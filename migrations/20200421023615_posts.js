exports.up = function (knex) {
    return knex.schema.hasTable("posts").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("posts", (table) => {
                table.increments("id").primary()
                table.string("title").notNullable()
                table.string("slug").unique().notNullable()
                table.string("images") // imageUrls[]
                table.string("excerpt", 500)
                table.longtext("content").notNullable()
                table.integer("votes")
                table.integer("comments_count").unsigned()
                table.string("status").defaultTo("draft") //[draft, published, pending, future-(datetime), private, archived]
                table.string("categories") // categoryNames[]
                table.text("tags") // string[]
                table.string("type").defaultTo("post") //post, page
                table.boolean("allow_comment").defaultTo(true)
                table
                    .integer("user_id")
                    .unsigned()
                    .references("id")
                    .inTable("users")
                    .onUpdate("CASCADE") //.onDelete('CASCADE')
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("posts")
}
