const _ = require('lodash');
const log = require('../services/log');
const squel = require('squel');

const MAP = {
    id: 'id',
    userEmail: 'user_email',
    firstName: 'user_first_name',
    lastName: 'user_last_name',
    screenWidth: 'screen_width',
    screenHeight: 'screen_height',
    numberOfVisits: 'visits',
    pageResponseTime: 'page_response',
    domain: 'domain',
    pagePath: 'path'
};

module.exports = {
    query
};
let queryString;

async function query(req, res) {
    queryString = squel.select().from("session");
    const predicates = req.body.predicates;
    log.info(JSON.stringify(predicates, null, 2));

    _.each(predicates, buildQuery);
    return res.send({sql: queryString.toString()});
}

function buildQuery(predicate) {
    if(!predicate.predicateField || !predicate.filterField || !predicate.filterValue) return;
    if(!predicate.type) predicate.type = 'string';
    const field = MAP[predicate.predicateField];

    let statement = '';
    switch(predicate.filterField) {
        case 'startsWith':
            statement = `LIKE '${predicate.filterValue}%'`;
            break;
        case 'doesntStartWith':
            statement = `NOT LIKE '${predicate.filterValue}'%`;
            break;
        case 'equals':
            statement = (predicate.type === 'string') ? `= '${predicate.filterValue}'` : `= ${predicate.filterValue}`;
            break;
        case 'doesntEqual':
            statement =  (predicate.type === 'string') ? `!= '${predicate.filterValue}'` : `!= ${predicate.filterValue}`;
            break;
        case 'contains':
            statement = `LIKE '%${predicate.filterValue}%'`;
            break;
        case 'doesntContain':
            statement = `NOT LIKE '%${predicate.filterValue}%'`;
            break;
        case 'inList':
            statement = `IN (${cleanListInput(predicate.filterValue)})`;
            break;
        case 'notInList':
            statement = `NOT IN (${cleanListInput(predicate.filterValue)})`;
            break;
        case 'range':
            if(!predicate.rangeValue) {
                log.error('No Range Value sent up for range call');
                return;
            }

            statement = `BETWEEN ${predicate.filterValue} AND ${predicate.rangeValue}`;
            break;
        case 'lessThanOrEqual':
            statement = `<= ${predicate.filterValue}`;
            break;
        case 'greaterThanOrEqual':
            statement = `>= ${predicate.filterValue}`;
            break;
        default:
            log.error(`Predicate with field ${predicate.filterField} not implemented`);
            break;
    }

    queryString = queryString.where(`${field} ${statement}`);
}

function cleanListInput(list) {
    return _.map(list.split(','), val => {
        val.trim();
        return `'${val}'`;
    }).join(', ');
}


