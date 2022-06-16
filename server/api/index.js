const express = require('express');
const router = express.Router();

const {
    createToken,
    requireSession,
    validateSession,
    getPublicProfile,
    getPrivateProfile,
    getUserCurrency,
    getUserRole,
    getSessionId,
    getPetSpecies,
    doLoginUser,
    doRegisterUser,
    doUpdateUser,
    doRegisterPet
} = require('../logic');

require('dotenv').config();

/* ========================================

    Retrieve token data from cookies. */
    
    router.get('/get/cookie', async (req, res) => {
        const token = req.cookies.token;

        if (token) {
            const session = await validateSession(token);

            if (session) {
                res.json(session.user);
            } else {
                res.json(null);
            };
        } else {
            res.json(null);
        };
    });

/* ===================================== 

    Register a new user account into the database. */

    router.post('/register', async (req, res) => {
        const result = await doRegisterUser(req.body);

        if (result) {
            res.status(201).send('Successfully inserted a new user row into the database.');
        } else {
            res.status(400).send('Unable to insert a new user row into the database.');
        };
    });

/* ===================================== 

    Register a new pet into the database. */

    router.post('/register/:id/pet', async (req, res) => {
        const sessionId = getSessionId(req.cookies.token);
        const requestId = parseInt(req.params.id);
        
        if (sessionId === requestId) {
            return result = await doRegisterPet(req.cookies.token, req.body)
                .then((result) => {
                    res.status(201).send('Successfully inserted a new pet row into the database.');
                }).catch((error) => {
                    throw error;
                });
        } else {
            res.status(400).send('Unable to insert a new pet row into the database.');
        };
    });

/* ========================================

    Create a new login session using JWT. */

    router.post('/login', async (req, res) => {
        const result = await doLoginUser(req.body.email, req.body.password);
        
        if (result) {
            const token = createToken(result);

            res.cookie('token', token, {
                httpOnly: true
            });

            res.status(201).send('A new cookie has been created.');
        } else {
            res.status(401).send('Invalid login credentials submitted.');
        };
    });

/* ========================================

    End a current JWT session. */

    router.post('/logout', async (req, res) => {
        res.status(202).clearCookie('token').send("Cleared the browser's session cookie.");
    });

/* ========================================

    Get a user's account role. */

    router.get('/get/user/:id/role', requireSession, async (req, res) => {
        const session = await validateSession(req.cookies.token);
        const id = parseInt(req.params.id);

        if (session) {
            const userRole = await getUserRole(id)
                .then((result) => {
                    return result;
                }).catch((error) => {
                    throw error;
                });

            res.json(userRole);
        } else {
            res.status(400).send('Server could not find an active session.');
        };
    });

/* ========================================

    Get a user's currency table. */

    router.get('/get/user/:id/currency', requireSession, async (req, res) => {
        const session = await validateSession(req.cookies.token);
        const id = parseInt(req.params.id);

        if (session.user === id) {
            const currency = await getUserCurrency(session.user)
                .then((result) => {
                    return result;
                }).catch((error) => {
                    throw error;
                });
                
            res.json(currency);
        } else {
            res.status(400).send('Server could not find an active session.');
        };
    });

/* ========================================

    Get all pet species. */

    router.get('/get/species', requireSession, async (req, res) => {
        const session = await validateSession(req.cookies.token);
        const sessionId = session.user;

        if (sessionId) {
            const array = await getPetSpecies();
            res.json(array);
        } else {
            res.status(400).send('Server could not find an active session.');
        };
    });

/* ========================================

    Get a user's public profile data. */

    router.get('/get/user/:id/public', requireSession, async (req, res) => {
        const session = await validateSession(req.cookies.token);
        const sessionId = session.user;

        if (sessionId) {
            return profile = await getPublicProfile(req.params.id)
                .then((result) => {
                    res.json(result);
                }).catch((error) => {
                    throw error;
                });
        } else {
            res.status(400).send('Server could not find an active session.');
        };
    });

/* ========================================

    Get a user's public private data. */

    router.get('/get/user/:id/private', requireSession, async (req, res) => {
        const session = await validateSession(req.cookies.token);
        const sessionId = session.user;
        const paramsId = req.params.id;

        if (sessionId == paramsId) {
            return profile = await getPrivateProfile(sessionId)
                .then((result) => {
                    res.json(result);
                }).catch((error) => {
                    throw error;
                });
        } else {
            res.status(400).send('Server could not find an active session.');
        };
    });

/* ========================================

    Update a user row with new data. */

    router.post('/update/user/:id', requireSession, async (req, res) => {
        const sessionId = getSessionId(req.cookies.token);
        const requestId = parseInt(req.params.id);
        
        if (sessionId === requestId) {
            return result = await doUpdateUser(req.cookies.token, req.body).then((result) => {
                res.status(201).send('Updated a user row in the database.');
            }).catch((error) => {
                console.log('API error');
                throw error;
            });
        } else {
            res.status(401).send('Server could not find a valid session.');
        };
    });

/* ================================== */

module.exports = router;