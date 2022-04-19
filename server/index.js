const express = require('express');
const app = express();

require('dotenv').config();
require('./middleware')(app);

app.listen(process.env.PORT, () => {
    console.log('►  Server is now running on: http://localhost:' + process.env.PORT);
});