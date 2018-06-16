const _ = require('lodash');

module.exports = {
    query
};

async function query(req, res) {
    return res.send({sql: 'nope'});
}
