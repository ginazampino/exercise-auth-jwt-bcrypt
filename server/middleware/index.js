const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');

module.exports = function(app) {
    app.use(history({}));
    app.use(express.static(path.resolve(__dirname, '../../build')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    require('../routes')(app);
};