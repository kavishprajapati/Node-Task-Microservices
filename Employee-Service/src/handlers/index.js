const { deleteEmployeesByCompanyId } = require('../use-cases')
const { Kafka } = require('kafkajs')

const makeDeleteAllEmployeeByCompanyId = require('./delete-employee-by-companyId')
const deleteAllEmployeeByCompanyId = makeDeleteAllEmployeeByCompanyId({ deleteEmployeesByCompanyId, Kafka })

module.exports = deleteAllEmployeeByCompanyId 