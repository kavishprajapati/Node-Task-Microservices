const axios = require('axios')

const makeGetCompanyId = require('./internal-get-id')
const getCompanyId = makeGetCompanyId({axios})

const makeGetCompanyData = require('./get-company-data')
const getCompanyData = makeGetCompanyData({ axios })

module.exports = {getCompanyId, getCompanyData}