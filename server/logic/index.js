const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { knex } = require('../database/index.js');
const { User, Species, Breed, Pet } = require('../database/models');

/* ========================================

    CREATE */

    async function createHash(password) {
        return await bcrypt.hash(password, 10);
    };

    /* ================================== */

    function createToken(id) {
        return result = jwt.sign({ user: id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
    };

/* ========================================

    REQUIRE */

    async function requireSession(req, res, next) {
        const session = await validateSession(req.cookies.token);

        if (session.user != null) { 
            next(); 
        } else return false;
    };
    
/* ========================================

    VALIDATE */

    async function validateSession(session) {
        return isValid = jwt.verify(session, process.env.JWT_SECRET, (error, decode) => {
            if (error) { 
                return null; 
            } else return decode;
        });
    };

    /* ================================== */

    function validateForm(data) {
        return isValid = Object.values(data).every((string) => {
            return (string.trim() != '') && (typeof string == 'string');
        });
    };

    /* ================================== */

    function validatePassword(password, confirm) {
        return isMatch = (password === confirm);
    };

    /* ================================== */

    function validateNewPassword(password, confirm) {
        const isNotNull = ((password !== null) && (confirm !== null));

        function checkMatch() {
            return isMatch = (password === confirm);
        };

        function checkType() {
            return isString = (typeof password == 'string') && (typeof confirm == 'string');
        };

        function checkEmpty() {
            return isNotEmpty = (password.trim() != '') && (confirm.trim() != '');
        };

        if (isNotNull) {
            return checkMatch() && checkType() && checkEmpty();
        } else return false;
    };

/* ========================================

    GET */

    async function getUserPassword(id) {
        const user = await User.query().select('userPassword').where('id', id).first();

        return user.userPassword;
    };

    /* ================================== */

    async function getUserRole(id) {
        const user = await findUserById(id);

        async function queryDatabase() {
            const result = await User.query().innerJoin('userroles', 'users.roleId', 'userroles.id').select('roleName').where('users.id', id);
            
            return result[0].roleName;
        };

        if (user) { 
            return role = await queryDatabase(); 
        } else return false;
    };

    /* ================================== */

    async function getAllPetSpecies() {
        const species = await Species.query().select('*');
        let speciesList = [];

        species.forEach((row) => { 
            speciesList.push(row.speciesName); 
        });

        return speciesList;
    };

    /* ================================== */

    function getSessionId(session) {
        const isValid = jwt.verify(session, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
                 return null; 
            } else return decode.user;
        });

        if (isValid) { 
            return isValid; 
        } else return false;
    };

    /* ================================== */

    function getCurrentTime() {
        const utcTime = new Date().toISOString().replace('Z','').replace('T', ' ');

        return new Date(utcTime);
    };

    /* ================================== */

    async function getUserCurrency(id) {
        const data = await getPrivateInventory(id);

        if (data) {
            return {
                tokens: data.tokens,
                tickets: data.tickets
            };
        } else return false;
    };

    /* ================================== */

    async function getPublicProfile(id) {
        const public = await User.query().where('id', id).first();

        return {
            id: public.id,
            userName: public.userName,
            teamName: public.teamName,
            teamPrefix: public.teamPrefix,
            teamSize: public.teamSize,
            websiteName: public.websiteName,
            websiteUrl: public.websiteUrl,
            createdAt: public.createdAt
        };
    };

    /* ================================== */

    async function getPrivateProfile(id) {
        const private = await User.query().where('id', id).first();

        return {
            userEmail: private.userEmail,
            friendCode: private.friendCode
        };
    };

    /* ================================== */

    async function getPrivateInventory(id) {
        const inventory = await User.query().where('id', id).first();

        return {
            tokens: inventory.tokens,
            tickets: inventory.tickets,
            beautyTreats: inventory.beautyTreats,
            beautyPotions: inventory.beautyPotions,
            healthTreats: inventory.healthTreats,
            healthPotions: inventory.healthPotions,
            loveTreats: inventory.loveTreats,
            lovePotions: inventory.lovePotions,
            skillTreats: inventory.skillTreats,
            skillPotions: inventory.skillPotions,
        };
    };
    
/* ========================================

    FIND */

    async function findUserById(id) {
        const user = await User.query().where('id', id).first();

        if (user) { 
            return user.id; 
        } else return false;
    };

    /* ================================== */

    async function findUserByUsername(username) {
        const user = await User.query().where('userName', username).first();

        if (user) { 
            return user.id; 
        } else return false;
    };

    /* ================================== */

    async function findUserByEmail(email) {
        const user = await User.query().where('userEmail', email).first();

        if (user) { 
            return user.id; 
        } else return false;
    };

    /* ================================== */

    async function findUserByCode(code) {
        const user = await User.query().where('friendCode', code).first();

        if (user) { 
            return user.id; 
        } else return false;
    };

    /* ================================== */

    async function findPetByShowName(name) {
        const pet = await Pet.query().where('showName', name).first();

        if (pet) { 
            return pet.id; 
        } else return false;
    };

    /* ================================== */

    async function findBreedByName(name) {
        const breed = await Breed.query().where('breedName', name).first();

        if (breed) { 
            return breed; 
        } else return false;
    };

    /* ================================== */

    async function findExistingUser(username, email) {
        const foundEmail = await findUserByEmail(email);
        const foundUsername = await findUserByUsername(username);

        if (foundEmail || foundUsername) { 
            return false; 
        } else return true;
    };

/* ========================================

    DO */

    async function doBcryptCompare(id, password) {
        const hash = await getUserPassword(id);

        return await bcrypt.compare(password, hash);
    };

    /* ================================== */

    function doParseGeneration(number) {
        if (number) { 
            return parseInt(number); 
        } else return null;
    };

    /* ================================== */

    async function doRegisterPet(sessionData, formData) {
        const sessionId = await checkSession();

        async function checkSession() {
            const session = await validateSession(sessionData);

            if (session) { 
                return session.user; 
            } else return false;
        };

        async function checkShowName() {
            return result = await findPetByShowName(formData.showName);
        };

        async function checkBreed() {
            return result = await findBreedByName(formData.petBreed);
        }

        function checkGeneration() {
            if (formData.petGeneration) {
                return result = doParseGeneration(formData.petGeneration);
            } else return false;
        };

        async function registerPet() {
            const isTaken = await checkShowName();
            const breedData = await checkBreed();
            const parsedNumber = checkGeneration();

            if (!isTaken && breedData) {
                await knex('pets').insert({
                    userId: sessionId,
                    petName: formData.petName,
                    showName: formData.showName,
                    breedId: breedData.id,
                    petGender: formData.petGender,
                    petGeneration: parsedNumber,
                    petAncestry: formData.petAncestry,
                    petPedigree: formData.petPedigree,
                    petModification: formData.petModification,
                    originalOwner: formData.originalOwner,
                    originalPrefix: formData.originalPrefix
                });
            } else return false;
        };

        if (sessionId) {
            registerPet();
        } else return false;
    };

    /* ================================== */
    
    async function doRegisterUser(formData) {
        const isValid = validateForm(formData) && validatePassword(formData.password, formData.confirm);

        async function generateData() {
            return data = {
                hashedPassword: await createHash(formData.password),
                randomNumber: Math.floor(Math.random() * 900000) + 100000,
                currentTime: getCurrentTime()
            };
        };

        async function checkAvailability() {
            return isAvailable = await findExistingUser(formData.email, formData.username);
        };

        async function checkCode() {
            return user = await findUserByCode(formData.code);
        };

        async function registerUser() {
            if (checkAvailability() && checkCode()) {
                const gen = await generateData();

                await knex('users').insert({
                    userName: formData.username,
                    userEmail: formData.email,
                    userPassword: gen.hashedPassword,
                    inviteCode: formData.code,
                    friendCode: gen.randomNumber,
                    createdAt: gen.currentTime
                });

                return true;
            } else return false;
        };

        if (isValid) { return registerUser(); } else return false;
    };

    /* ================================== */

    async function doLoginUser(email, password) {
        const id = await findUserByEmail(email);

        async function updateDatabase() {
            const currentTime = getCurrentTime();

            await knex('users')
                .where({ 'id': id })
                .update({ visitedAt: currentTime });
            
            return id;
        };

        async function verifyUser() {
            const verification = await doBcryptCompare(id, password);
            if (verification) { return updateDatabase(); } else return false;
        };

        if (id) { 
            return verifyUser(); 
        } else return false;
    };

    /* ================================== */

    function validateNewPassword(password, confirm) {
        let checks = [];

        function checkNull(pass, conf) {
            if ((pass && conf) !== null) {
                return true;
            } else return false;
        };

        function checkType(pass, conf) {
            if (typeof (pass && conf) == 'string') {
                checks.push(true);
            } else checks.push(false);
        };

        function checkLength(pass, conf) {
            if ((pass && conf).trim() != '') {
                checks.push(true);
            } else checks.push(false);
        };

        function checkMatch(pass, conf) {
            if (pass === conf) {
                checks.push(true);
            } else checks.push(false);
        };

        function checkResults() {
            if (checks.length > 0) {
                return results = Object.values(checks).every((item) => {
                    return item === true;
                });
            } else return false;
        };

        function runChecks(pass, conf) {
            checkType(pass, conf);
            checkLength(pass, conf);
            checkMatch(pass, conf);

            return result = checkResults();
        };

        function checkPassword(pass, conf) {
            const checkResult = checkNull(pass, conf);

            if (checkResult) {
                return validationResult = runChecks(pass, conf);
            } else return false;
        };

        return isValid = checkPassword(password, confirm);
    };

    /* ================================== */

    async function doUpdateUser(sessionData, formData) {
        const sessionId = await checkSession(sessionData);
        const userId = await checkUser(sessionId);
        const newPassword = checkForPassword(formData.password, formData.confirm);

        async function checkSession(data) {
            const session = await validateSession(data);

            if (session) { 
                return session.user; 
            } else return false;
        };

        async function checkUser(data) {
            const user = await findUserById(data);

            if (user) { 
                return user; 
            } else return false;
        };

        function checkForPassword(password, confirm) {
            return (password || confirm);
        };

        async function updateUser(data) {
            const currentTime = getCurrentTime();
            let validPassword = evaluatePassword();

            function evaluatePassword() {
                if (newPassword) {
                    return isValid = validateNewPassword(data.password, data.confirm);
                } else return false;
            };

            await knex('users')
                .where({ 'id': userId })
                .update({
                    teamName: data.team,
                    teamPrefix: data.prefix,
                    websiteName: data.website,
                    websiteUrl: data.url,
                    updatedAt: currentTime
                });

            if (validPassword) {
                const hash = await createHash(data.password);

                await knex('users')
                    .where({ 'id': userId })
                    .update({
                        userPassword: hash
                    });
            };
        };

        if (sessionId === userId) {
            await updateUser(formData);
        } else return false;
    };

/* ================================== */

module.exports = {
    createHash,
    createToken,
    requireSession,
    findUserByEmail,
    findUserByUsername,
    findUserByCode,
    findExistingUser,
    findUserById,
    findPetByShowName,
    findBreedByName,
    validateForm,
    validatePassword,
    validateSession,
    validateNewPassword,
    getUserPassword,
    getPublicProfile,
    getCurrentTime,
    getPrivateProfile,
    getUserCurrency,
    getUserRole,
    getSessionId,
    getAllPetSpecies,
    doLoginUser,
    doRegisterUser,
    doUpdateUser,
    doBcryptCompare,
    doRegisterPet,
    doParseGeneration
};