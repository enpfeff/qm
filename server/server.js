const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const log = require('./services/log');
const C = require('./services/constants');

const ENABLED_MODULES = [
    require('./qm')
];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, '../ui/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

_.each(ENABLED_MODULES, module => module(app));

app.listen(C.PORT, () => log.info(`Server Up and Running, port: ${C.PORT}`));