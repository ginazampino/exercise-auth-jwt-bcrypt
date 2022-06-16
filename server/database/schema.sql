DROP SCHEMA `petzhub`;
CREATE SCHEMA `petzhub`;
USE `petzhub`;

CREATE TABLE userRoles (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    roleName            VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    roleId              INT DEFAULT 4 NOT NULL, -- userRoles(id),

    userEmail           VARCHAR(255) UNIQUE NOT NULL,
    userName            VARCHAR(255) UNIQUE NOT NULL,
    userPassword        VARCHAR(255) NOT NULL,

    websiteName         VARCHAR(255) UNIQUE NULL,
    websiteUrl          VARCHAR(500) UNIQUE NULL,

    teamName            VARCHAR(255) UNIQUE NULL,
    teamPrefix          VARCHAR(255) UNIQUE NULL,
    teamDescription     VARCHAR(300) NULL,
    teamSize            INT DEFAULT 5 NOT NULL,

    tokens              INT DEFAULT 0 NOT NULL,
    tickets             INT DEFAULT 0 NOT NULL,

    beautyTreats        INT DEFAULT 0 NOT NULL,
    beautyPotions       INT DEFAULT 0 NOT NULL,
    healthTreats        INT DEFAULT 0 NOT NULL,
    healthPotions       INT DEFAULT 0 NOT NULL,
    loveTreats          INT DEFAULT 0 NOT NULL,
    lovePotions         INT DEFAULT 0 NOT NULL,
    skillTreats         INT DEFAULT 0 NOT NULL,
    skillPotions        INT DEFAULT 0 NOT NULL,

    inviteCode          INT NULL,
    friendCode          INT UNIQUE NULL,

    createdAt           DATETIME NULL,
    updatedAt           DATETIME NULL,
    visitedAt           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD FOREIGN KEY (roleId) REFERENCES userRoles(id);

INSERT INTO userRoles(roleName)
VALUES  ('Adversary'),  -- System
        ('Mayor'),      -- Admin
        ('Ranger'),     -- Moderator
        ('Trainer'),    -- Member
        ('Deleted'),    -- Deactivated
        ('Banned');

INSERT INTO users (roleId, userEmail, userName, userPassword, friendCode)
VALUES (4, 'domain@email.com', 'Domain', 'password', 111222);

CREATE TABLE petSpecies (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    speciesName         VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO petSpecies (speciesName)
VALUES  ('Dog'),
        ('Cat'),
        ('Wild');

CREATE TABLE petBreeds (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    speciesId           INT NOT NULL, -- petSpecies(id)
    breedName           VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO petBreeds (speciesId, breedName)
VALUES  (1, 'Bulldog'),
        (1, 'Chihuahua'),
        (1, 'Dachshund'),
        (1, 'Dalmatian'),
        (1, 'German Shepherd'),
        (1, 'Golden Retriever'),
        (1, 'Great Dane'),
        (1, 'Jack Russel'),
        (1, 'Labrador'),
        (1, 'Mutt'),
        (1, 'Papillion'),
        (1, 'Poodle'),
        (1, 'Pug'),
        (1, 'Scottie'),
        (1, 'Sheepdog'),
        (2, 'Alley Cat'),
        (2, 'B&W Shorthair'),
        (2, 'Calico'),
        (2, 'Chinchilla Persian'),
        (2, 'Desert Lynx'),
        (2, 'Egyptian Mau'),
        (2, 'Honeybear'),
        (2, 'Japanese Bobtail'),
        (2, 'Maine Coon'),
        (2, 'Orange Shorthair'),
        (2, 'Persian'),
        (2, 'Russian Blue'),
        (2, 'Scottish Fold'),
        (2, 'Siamese'),
        (2, 'Tabby'),
        (3, 'Bunny'),
        (3, 'Pig');

ALTER TABLE petBreeds
ADD FOREIGN KEY (speciesId) REFERENCES petSpecies(id);

CREATE TABLE pets (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userId              INT NOT NULL, -- users(id)
    petName             VARCHAR(20) NOT NULL,
    showName            VARCHAR(255) UNIQUE NOT NULL,
    breedId             INT NOT NULL, -- petBreeds(id)

    petGender           ENUM('Male', 'Female') NOT NULL,
    petVersion          ENUM('Petz 3', 'Petz 4', 'Petz 5') NOT NULL,
    petGeneration       INT NULL,
    petDescription      TEXT NULL,

    petAncestry         ENUM('Inbred', 'Noninbred') NOT NULL,
    petPedigree         ENUM('Mixed Breed', 'Purebred') NOT NULL,
    petModification     ENUM('Modified', 'Unmodified') NOT NULL,

    originalOwner       VARCHAR(255) NULL,
    originalPrefix      VARCHAR(255) NULL,

    beautyPoints        INT DEFAULT 0 NOT NULL,
    healthPoints        INT DEFAULT 0 NOT NULL,
    lovePoints          INT DEFAULT 0 NOT NULL,
    skillPoints         INT DEFAULT 0 NOT NULL
);

INSERT INTO pets (userId, petName, showName, originalOwner, originalPrefix, petVersion, breedId, petAncestry, petPedigree, petModification)
VALUES (1, 'Paws', 'Another Time', 'Dia', 'DPP', 'Petz 4', 3, 'Inbred', 'Mixed Breed', 'Unmodified');

ALTER TABLE pets
ADD FOREIGN KEY (userId) REFERENCES users(id);

ALTER TABLE pets
ADD FOREIGN KEY (breedId) REFERENCES petBreeds(id);

CREATE TABLE eventCategories (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    categoryName        VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO eventCategories(categoryName)
VALUES  ('None'),       -- Candid photo
        ('Portrait'),   -- Dali pose
        ('Profile');    -- Dane pose

CREATE TABLE petImages (
    id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    petId               INT NOT NULL, -- pets(id)
    categoryId          INT NOT NULL, -- eventCategories(id)

    imageFile           VARCHAR(1000) NOT NULL,
    imageName           VARCHAR(255) NOT NULL,
    imageUrl            VARCHAR(5000) NOT NULL,

    createdAt           DATE NOT NULL,
    updatedAt           DATE NOT NULL
);

ALTER TABLE petImages
ADD FOREIGN KEY (petId) REFERENCES pets(id);

ALTER TABLE petImages
ADD FOREIGN KEY (categoryId) REFERENCES eventCategories(id);