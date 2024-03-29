const connection = require('../../knexfile')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        // host: '127.0.0.1',
        // port: 3000,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
})


module.exports =  knex