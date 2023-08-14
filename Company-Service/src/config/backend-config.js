const config = {
    cockroach: {
        host: 'localhost',          // Database host
        user: 'kavish',             // Database User 
        database: 'companydb',      // Database name
        port: 26257,                // Database port
        max: 20,                    // Maximum number of connections in the pool
        idleTimeoutMillis: 30000,   // Maximum time a connection can be idle before being closed
        connectionTimeoutMillis: 2000, // Maximum time to wait for a connection from the pool
        dialect: 'postgres'
    }
}

module.exports = config