
exports.up = function(knex) {
	return knex.schema.hasTable('downloads_logs').then(exists => {
			if (!exists)
			{
					return knex.schema.createTable('downloads_logs', table => {
							table.increments('id').primary()
							table.datetime('timestamp')
							table.string('user_ip')
							table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE')//.onDelete('CASCADE')
							table.integer('permission_id').unsigned().references('id').inTable('downloads_permissions').onUpdate('CASCADE')//.onUpdate('CASCADE')//.onDelete('CASCADE')
							// table.timestamps(true, true)
					})
			}
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('downloads_logs')
};
