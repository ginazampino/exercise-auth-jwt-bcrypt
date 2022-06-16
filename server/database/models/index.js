const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    };
};

class Species extends Model {
    static get tableName() {
        return 'petspecies';
    };
};

class Breed extends Model {
    static get tableName() {
        return 'petbreeds';
    };
};

class Pet extends Model {
    static get tableName() {
        return 'pets';
    };
};

module.exports = {
    User,
    Species,
    Breed,
    Pet
};