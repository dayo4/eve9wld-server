exports.up = function (knex) {
    return knex.schema.hasTable("posts_comments").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("posts_comments", (table) => {
                table.bigIncrements("id").primary()
                table.text("content").notNullable()
                table.string("author_ip")
                table.integer("thumbs_up")
                table.integer("thumbs_down")
                table
                    .integer("user_id")
                    .unsigned()
                    .references("id")
                    .inTable("users")
                    .onUpdate("CASCADE") //.onDelete('CASCADE')
                table
                    .integer("post_id")
                    .unsigned()
                    .references("id")
                    .inTable("posts")
                    .onUpdate("CASCADE")
                    .onDelete("CASCADE")
                table
                    .integer("parent_id")
                    .unsigned()
                    .defaultTo(0)
                    .references("id")
                    .inTable("posts_comments")
                    .onUpdate("CASCADE")
                    .onDelete("CASCADE")
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("posts_comments")
}
