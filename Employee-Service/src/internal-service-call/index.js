const axios = require('axios')
const config = require('../config')

const makeGetCompanyId = require('./internal-get-id')
const getCompanyId = makeGetCompanyId({axios, config})

const makeGetCompanyData = require('./get-company-data')
const getCompanyData = makeGetCompanyData({ axios, config })

module.exports = {getCompanyId, getCompanyData}