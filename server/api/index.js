const express = require('express');
const router = express.Router();

const {
    testApi
} = require('../logic');

router.get('/test', async (req, res) => {
    const result = await testApi();

    res.json(result);
});

module.exports = router;