const config = require('../config')

const { Pool } = require('pg')

const cockroach = new Pool({

    host: config.cockroach.host,
    user: config.cockroach.user,
    database: config.cockroach.database,
    port: config.cockroach.port,
    max: config.cockroach.max,
    idleTimeoutMillis: config.idleTimeoutMillis,
    connectionTimeoutMillis: config.cockroach.connectionTimeoutMillis

})

const makeEmployee = require('./employee')
const EmployeeTable = makeEmployee({ cockroach })

module.exports = { EmployeeTable }

