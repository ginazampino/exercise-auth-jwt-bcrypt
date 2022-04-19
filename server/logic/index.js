const { knex } = require('../database/index.js');
const User = require('../database/models/User.js');

async function testApi(data) {
    const result = await User.query().first();

    if (result) {
        return result;
    } else {
        return false;
    };
};

module.exports = {
    testApi
};