const fs = require('fs')

const config = {
    cockroach: {
        host: 'localhost',
        user: 'kavish',
        database: 'companydb',
        port: 26257,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        dialect: 'postgres'
    }
}

module.exports = config

