const config = require('../config')

const { Pool } = require('pg')


const cockroach = new Pool({

    host: config.cockroach.host,
    user: config.cockroach.user,
    database: config.cockroach.database,
    port: config.cockroach.port,
    max: config.cockroach.max,
    idleTimeoutMillis: config.idleTimeoutMillis,
    connectionTimeoutMillis: config.cockroach.connectionTimeoutMillis,
})


const makeCompany = require('./company')
const companyTable = makeCompany({cockroach})


module.exports = { companyTable }
