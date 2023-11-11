# Exercise: Authentication & Authorization
**Using:** Node.js, Express, MariaDB, Vue2, vue-router, Objection/Knex, Axios, cookie-parser, JSON Web Tokens (JWT), and Bcrypt.

### Functionality
1. Register a new account
2. Log in to your account
3. Update your user profile (form submission)
4. Log out of your account

## Server

### REST API
Custom RESTful APIs built with Node.js and Express:  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/api/index.js#L46
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/api/index.js#L188

### ORM
Database interaction performed using Objection with Knex:  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L203
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L402

### Sessions
Manage authentication sessions using JSON Web Tokens (JWT):  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L16
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L24

### Password Hashing
Salt and hash passwords using Bcrypt:  

## Client

### Navigation Guards
Protect application routes using navigation guards with vue-router:
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/src/index.js#L7
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/src/index.js#L21
