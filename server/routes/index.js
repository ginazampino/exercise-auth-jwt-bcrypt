const path = require('path');
const api = require('../api');

module.exports = (app) => {
    app.use('/api', api);
    
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../build/index.html'));
    })
};