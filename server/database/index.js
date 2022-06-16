const { Model } = require('objection');
const Knex = require('knex');

require('dotenv').config();

const knex = Knex({
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : 'petzhub'
    },
    pool: { min: 0, max: 5 }
});

Model.knex(knex);

module.exports = {
    knex
};