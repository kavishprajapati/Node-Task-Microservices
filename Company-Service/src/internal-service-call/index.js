const axios = require('axios')

const makeCreateEmployee = require('./create-employee')
const createEmployee = makeCreateEmployee({ axios })

module.exports = { createEmployee }
