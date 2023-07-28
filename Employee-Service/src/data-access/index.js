const config = require('../config')

const { Pool } = require('pg')

const cockroach = new Pool({

    host: config.cockroach.host,
    user: config.cockroach.user,
    password: config.cockroach.password,
    database: config.cockroach.database,
    port: config.cockroach.port,
    max: config.cockroach.max,
    idleTimeoutMillis: config.idleTimeoutMillis,
    connectionTimeoutMillis: config.cockroach.connectionTimeoutMillis,
    ssl: config.cockroach.ssl

})

const makeEmployee = require('./employee')
const EmployeeTable = makeEmployee({cockroach})


module.exports = { EmployeeTable }
