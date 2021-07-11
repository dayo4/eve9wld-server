exports.up = function (knex) {
    return knex.schema.hasTable("products").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("products", (table) => {
                table.increments("id").primary()
                table.string("name").notNullable()
                table.string("slug").unique().notNullable()
                table.string("featured_image")
                table.string("images") // imageUrls[]
                table.string("price")
                table.string("sale_price")
                table.integer("total_sales")
                table.longtext("description").notNullable()
                table.text("short_description")
                table.boolean("downloadable").defaultTo(true)
                table.boolean("virtual").defaultTo(false)
                table.boolean("on_sale").defaultTo(true)
                table.datetime("on_sale_from")
                table.datetime("on_sale_to")
                table.boolean("sold_individually").defaultTo(true)
                table.string("status").defaultTo("draft") //[draft, published, pending, future-(datetime), private, archived]
                table.string("attributes") // attributes[]
                table.string("categories") // categoryIDs[]
                table.string("cross_sell_ids") // productIDs[]
                table.string("upsell_ids") // productIDs[]
                table.string("related_ids") // productIDs[]
                table.text("tags") // string[]
                table.string("purchase_note")
                table.string("type").defaultTo("simple") //simple, grouped, variable
                table.boolean("allow_reviews").defaultTo(true)
                table.string("average_rating")
                table.integer("rating_count")
                table.integer("reviews_count")
                table.boolean("featured").defaultTo(false)
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
    return knex.schema.dropTable("products")
}
