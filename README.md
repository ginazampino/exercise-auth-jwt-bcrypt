# Exercise: Authentication & Authorization
**Using:** Node.js, Express, MariaDB, Vue2, vue-router, Objection/Knex, Axios, cookie-parser, JSON Web Tokens (JWT), and Bcrypt.

### Example Functionality
1. Register a new account
2. Log in to your account
3. Update your user profile (form submission)
4. Log out of your account

## Server

### REST API
Examples of custom RESTful APIs built with Node.js and Express:  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/api/index.js#L46
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/api/index.js#L188

### ORM
Examples of database interaction performed using Objection with Knex:  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L203
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L402

### Sessions
Examples of managing authentication sessions using JSON Web Tokens (JWT):  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L16
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L24
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L36

### Password Hashing
Examples of hashing passwords using Bcrypt:  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L10
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L332
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/server/logic/index.js#L407

## Client

### Navigation Guards
Examples of protecting application routes using navigation guards with vue-router:
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/src/index.js#L7
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/src/index.js#L21
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/router.js#L17
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/router.js#L53
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/vue/private/app/UserEditor.vue#L104

### Form Handling
Examples of handling form submission data using Vue2 (Options API) and Axios:  
https://github.com/ginazampino/exercise-vue-auth-jwt-bcrypt/blob/2ebffeb86ceb59eacf0b898efa03800b3471fb1e/client/vue/public/PortalRegistrationForm.vue#L40
