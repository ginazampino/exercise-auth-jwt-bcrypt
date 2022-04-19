const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');

module.exports = function(app) {
    app.use(history({}));
    app.use(express.static(path.resolve(__dirname, '../../build')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    
    require('../routes')(app);
};