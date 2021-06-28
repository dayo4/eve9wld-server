
exports.up = function(knex) {
	return knex.schema.hasTable('downloads_permissions').then(exists => {
			if (!exists)
			{
					return knex.schema.createTable('downloads_permissions', table => {
							table.increments('id').primary()
							table.string('user_email')
							table.string('order_key')
							table.integer('downloads_remaining')
							table.integer('downloads_count')
							table.datetime('timestamp')
							table.datetime('access_granted')
							table.datetime('access_expires')
							table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE')//.onDelete('CASCADE')
							// table.integer('download_id').unsigned().references('id').inTable('downloads_logs').onUpdate('CASCADE')//.onDelete('CASCADE')
							table.integer('product_id').unsigned().references('id').inTable('products').onUpdate('CASCADE')//.onDelete('CASCADE')
							table.integer('order_id').unsigned().references('id').inTable('orders').onUpdate('CASCADE')//.onDelete('CASCADE')
							// table.timestamps(true, true)
					})
			}
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('downloads_permissions')
};
