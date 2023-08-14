const axios = require('axios')
const config = require('../config')

const makeCreateEmployee = require('./create-employee')
const createEmployee = makeCreateEmployee({ axios, config })

module.exports = { createEmployee }
