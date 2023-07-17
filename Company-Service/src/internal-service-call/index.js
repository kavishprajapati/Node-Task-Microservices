const axios = require('axios')

const makeInternalCallCreateEmployee = require('./create-employee')
const internalCallCreateEmployee = makeInternalCallCreateEmployee({ axios })

module.exports = { internalCallCreateEmployee }