const axios = require('axios');

/* ========================================

    Redirect to authenticated route if session exists. */

    async function findExistingSession(to, from, next) {
        const session = await axios.get('/api/get/cookie');

        if (session.data) {
            window.location.assign('/');
        } else {
            next();
        };
    };

/* ========================================

    Redirect to login portal if no session exists. */

    async function guardBehindSession(to, from, next) {
        const session = await axios.get('/api/get/cookie');

        if (session.data != null) {
            next();
        } else {
            window.location.assign('/login');
        };
    };

/* ================================== */

module.exports = {
    findExistingSession,
    guardBehindSession
};