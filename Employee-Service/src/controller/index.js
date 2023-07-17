const {createEmployee, getAllEmployee, deleteEmployee, updateEmployee, getEmployeeDataById} = require('../use-cases')

const makeCreateEmployeeAction = require('./create-employee')
const createEmployeeAction = makeCreateEmployeeAction({createEmployee})

const makeGetAllEmployeeAction = require('./get-all-employee')
const getAllEmployeeAction = makeGetAllEmployeeAction({ getAllEmployee })

const makeDeleteEmployeeAction = require('./delete-employee')
const deleteEmployeeAction = makeDeleteEmployeeAction({deleteEmployee})

const makeUpdateEmployeeAction = require('./update-employee')
const updateEmployeeAction = makeUpdateEmployeeAction({ updateEmployee })

const makeGetEmployeeDataByIdAction = require('./get-data-by-id')
const getEmployeeDataByIdAction = makeGetEmployeeDataByIdAction({ getEmployeeDataById })

module.exports = { createEmployeeAction, getAllEmployeeAction, deleteEmployeeAction, updateEmployeeAction, getEmployeeDataByIdAction }