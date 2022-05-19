const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { knex } = require('../database/index.js');
const User = require('../database/models/User.js');

/* ========================================

    AUTHENTICATE */

    async function createHash(password) {
        return await bcrypt.hash(password, 10);
    };

    function createToken(id) {
        return result = jwt.sign({ user: id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
    };

    async function requireSession(req, res, next) {
        const session = await validateSession(req.cookies.token);
    
        if (session.user != null) {
            next();
        } else {
            return false;
        };
    };
    
/* ========================================

    VALIDATE */

    function validateForm(data) {
        return isValid = Object.values(data).every((string) => {
            return (string.trim() != '') && (typeof string == 'string');
        });
    };

    function validatePassword(password, confirm) {
        return isConfirmed = (password === confirm);
    };

    function validateNewPassword(password, confirm) {
        const isNotMissing = ((password !== null) && (confirm !== null));
    
        if (isNotMissing) {
            const isMatch = (password === confirm);
    
            if (isMatch) {
                const isString = (typeof password == 'string') && (typeof confirm == 'string');
    
                if (isString) {
                    const isNotEmpty = (password.trim() != '') && (confirm.trim() != '');
    
                    if (isNotEmpty) {
                        console.log('[DEBUG] validateNewPassword() reported a valid password.');
                        return true;
                    } else {
                        console.log('[DEBUG] validateNewPassword() reported passwords are empty strings.');
                        return false;
                    };
    
                } else {
                    console.log("[DEBUG] validateNewPassword() reported passwords aren't strings.");
                    return false;
                };
    
            } else {
                console.log("[DEBUG] validateNewPassword() reported passwords don't match.");
                return false;
            };
            
        } else {
            console.log('[DEBUG] validateNewPassword() reported a missing password.');
            return false;
        };
    };

    async function validateSession(session) {
        const valid = jwt.verify(session, process.env.JWT_SECRET, (error, decode) => {
            if (error) { return null; } else { return decode; };
        });
    
        if (valid) {;
            return valid;
        } else {
            return false;
        };
    };

/* ========================================

    GET */

    function getCurrentTime() {
        const utc = new Date().toISOString().replace('Z','').replace('T', ' ');
        return new Date(utc);
    };

    function getSessionId(session) {
        const valid = jwt.verify(session, process.env.JWT_SECRET, (error, decode) => {
            if (error) { return null; } else { return decode.user; };
        });
    
        if (valid) {
            return valid;
        } else {
            return false;
        };
    }; 

    async function getUserPassword(id) {
        const result = await User.query().select("userPassword").where("id", id).first();
        return result.userPassword;
    };

    async function getUserRole(id) {
        const user = await findUserById(id);
    
        if (user) {
            const result = await User.query()
                .innerJoin("userroles", "users.roleId", "userroles.id")
                .select("roleName")
                .where("users.id", id)
    
            return result[0].roleName;
        } else {
            return false;
        };
    };

    async function getPublicProfile(id) {
        const profile = await User.query().where("id", id).first();
    
        return {
            id: profile.id,
            userName: profile.userName,
            teamName: profile.teamName,
            teamPrefix: profile.teamPrefix,
            teamDescription: profile.teamDescription,
            teamSize: profile.teamSize,
            websiteName: profile.websiteName,
            websiteUrl: profile.websiteUrl,
            createdAt: profile.createdAt
        };
    };
    
    async function getPrivateProfile(id) {
        const profile = await User.query().where("id", id).first();
    
        return {
            id: profile.id,
            userEmail: profile.userEmail,
            friendCode: profile.friendCode,
            userName: profile.userName,
            teamName: profile.teamName,
            teamSize: profile.teamSize,
            teamDescription: profile.teamDescription,
            teamPrefix: profile.teamPrefix,
            websiteName: profile.websiteName,
            websiteUrl: profile.websiteUrl,
            tokens: profile.tokens,
            tickets: profile.tickets,
            beautyTreats: profile.beautyTreats,
            beautyPotions: profile.beautyPotions,
            healthTreats: profile.healthTreats,
            healthPotions: profile.healthPotions,
            loveTreats: profile.loveTreats,
            lovePotions: profile.lovePotions,
            skillTreats: profile.skillTreats,
            skillPotions: profile.skillPotions,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt
        };
    };

    async function getUserCurrency(id) {
        const profile = await getPrivateProfile(id);
        
        if (profile) {
            return {
                tokens: profile.tokens,
                tickets: profile.tickets
            };
        } else {
            return false;
        };
    };
    
/* ========================================

    FIND */

    async function findUserById(id) {
        const result = await User.query().where("id", id).first();
    
        if (result) {
            return result.id;
        } else {
            console.log("[DEBUG] findUserByEmail() found no user.");
            return false;
        };
    };

    async function findUserByUsername(username) {
        const result = await User.query().where("userName", username).first();
    
        if (result) {
            return result.id;
        } else {
            console.log("[DEBUG] findUserByUsername() found no user.");
            return false;
        };
    };

    async function findUserByEmail(email) {
        const result = await User.query().where("userEmail", email).first();
    
        if (result) {
            return result.id;
        } else {
            console.log("[DEBUG] findUserByEmail() found no user.");
            return false;
        };
    };

    async function findUserByCode(code) {
        const result = await User.query().where("friendCode", code).first();
    
        if (result) {
            console.log("[DEBUG] findUserByCode() returned a user's ID.");
            return result.id;
        } else {
            console.log("[DEBUG] findUserByCode() found no user.");
            return false;
        };
    };

    async function findExistingUser(email, username) {
        const resultEmail = await findUserByEmail(email);
        const resultUsername = await findUserByUsername(username);
    
        if (resultEmail || resultUsername) {
            console.log("[DEBUG] findExistingUser() found a user and returned false.")
            return false;
        } else {
            console.log("[DEBUG] findExistingUser() found no user and returned true.")
            return true;
        };
    };

/* ========================================

    DO */

    async function doBcryptCompare(userId, password) {
        const hash = await getUserPassword(userId);
        return await bcrypt.compare(password, hash);
    };

    async function doRegisterUser(data) {
        const valid = validateForm(data) && validatePassword(data.password, data.confirm);
        const available = await findExistingUser(data.email, data.username);
        const friend = await findUserByCode(data.code);
    
        const generated = {
            hashedPassword: await createHash(data.password),
            randomCode: Math.floor(Math.random() * 900000) + 100000,
            currentTime: getCurrentTime()
        };
        
        if (valid) {
            if (available) {
                    if (friend) {
                        await knex('users').insert({
                            userName: data.username,
                            userEmail: data.email,
                            userPassword: generated.hashedPassword,
                            inviteCode: data.code,
                            friendCode: generated.randomCode,
                            createdAt: generated.currentTime
                        });
                        console.log("[DEBUG] registerUser() inserted a new user row into the database.");
                        return true;
                    } else {
                        console.log("[DEBUG] registerUser() received an invalid friend code.");
                        return false;
                    };
            } else {
                console.log("[DEBUG] registerUser() was told a user already exists.");
                return false;
            };
        } else {
            console.log("[DEBUG] registerUser() received invalid form data.");
            return false;
        };
    };

    async function doLoginUser(email, password) {
        const userId = await findUserByEmail(email);
    
        if (userId) {
            console.log("[DEBUG] loginUser() received a user ID from findUserByEmail().");
            const match = await doBcryptCompare(userId, password);
    
            if (match) {
                const currentTime = getCurrentTime();

                    await knex('users')
                        .where({ 'id': userId })
                        .update({
                            visitedAt: currentTime
                        });

                console.log("[DEBUG] loginUser() received a confirmed match from bcryptCompare().");  
                return userId;
            } else {
                console.log("[DEBUG] loginUser() received a response from bcryptCompare().");
                return false;
            };
        } else {
            console.log("[DEBUG] loginUser() failed: no user.");
            return false;
        };
    };

/* ========================================

    UPDATE */

    async function updateUser(session, data) {
        const valid = await validateSession(session);
        const user = await findUserById(valid.user);
        
        if (user) {
            const isEmpty = Object.values(data).every((value) => {
                return value === null;
            }); 
            
            if (isEmpty) {
                console.log("[DEBUG] updateUserProfile() received an empty form.")
                return false;
            } else {
                const newPassword = (data.password || data.confirm);
                
                if (newPassword) {
                    const isMatch = (data.password === data.confirm);
    
                    if (isMatch) {
                        const isValid = validateNewPassword(data.password, data.confirm);
    
                        if (isValid) {
                            const newHashedPassword = await createHash(data.password);
                            const currentTime = getCurrentTime();
    
                            await knex('users')
                                .where({ 'id': user })
                                .update({
                                    userPassword: newHashedPassword,
                                    teamName: data.team,
                                    teamPrefix: data.prefix,
                                    teamDescription: data.description,
                                    websiteName: data.website,
                                    websiteUrl: data.url,
                                    updatedAt: currentTime
                                });
    
                            console.log("[DEBUG] updateUserProfile() updated all profile information.");
                            return true;
                        } else {
                            console.log("[DEBUG] updateUserProfile() reported that new passwords aren't valid.")
                            return false;
                        }
                    } else {
                        console.log("[DEBUG] updateUserProfile() reported that new passwords don't match.")
                        return false;
                    };
    
                } else {
                    const currentDate = getCurrentTime();
    
                    await knex('users')
                        .where({ 'id': user })
                        .update({
                            teamName: data.team,
                            teamPrefix: data.prefix,
                            teamDescription: data.description,
                            websiteName: data.website,
                            websiteUrl: data.url,
                            updatedAt: currentDate
                        });
                    
                    console.log("[DEBUG] updateUserProfile() updated all profile information except for the password.");
                    return true;
                };
    
            };
    
        } else {
            console.log("[DEBUG] updateUserProfile() found no user.")
            return false;
        };
    };

/* ================================== */

module.exports = {
    // Authenticate:
    createHash,
    createToken,
    requireSession,

    // Find:
    findUserByEmail,
    findUserByUsername,
    findUserByCode,
    findExistingUser,
    findUserById,

    // Validate:
    validateForm,
    validatePassword,
    validateSession,
    validateNewPassword,

    // Get:
    getUserPassword,
    getPublicProfile,
    getCurrentTime,
    getPrivateProfile,
    getUserCurrency,
    getUserRole,
    getSessionId,

    // Do:
    doLoginUser,
    doRegisterUser,
    doBcryptCompare,

    // Update:
    updateUser
};