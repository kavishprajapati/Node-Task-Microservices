const fs = require('fs')

const config = {
    cockroach: {
        host: 'localhost',
        user: 'kavish',
        password: 'kavish',
        database: 'companydb',
        port: 26257,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        dialect: 'postgres',
        // ssl: {
        //     ca: fs.readFileSync('/home/ad.rapidops.com/kavish.prajapati/Documents/CockroachDB/certs/ca.crt').toString(),
        //     key: fs.readFileSync('/home/ad.rapidops.com/kavish.prajapati/Documents/CockroachDB/certs/client.root.key').toString(),
        //     crt: fs.readFileSync('/home/ad.rapidops.com/kavish.prajapati/Documents/CockroachDB/certs/client.root.crt').toString()
        // }
    }
}

module.exports = config