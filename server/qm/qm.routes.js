const router = require('express-promise-router')();
const controller = require('./qm.controller');

module.exports = routes;

function routes(app) {
    router.post('/', controller.query);
    app.use('/predicate', router);
}