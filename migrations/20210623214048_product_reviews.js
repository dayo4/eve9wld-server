
exports.up = function(knex) {
  	return knex.schema.hasTable('product_reviews').then(exists => {
			if (!exists)
			{
					return knex.schema.createTable('product_reviews', table => {
							table.increments('id').primary()
							table.string('status')//approved, hold, spam, unspam, untrash
							table.integer('rating').defaultTo(5) // 0 - 5
							table.string('review', 1000)
							table.boolean('verified') //if the reviewer bought the product
                            table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE')
							table.integer('product_id').unsigned().references('id').inTable('products').onUpdate('CASCADE')
							table.timestamps(true, true)
					})
			}
	})
};

exports.down = function(knex) {
  	return knex.schema.dropTable('product_reviews')
};