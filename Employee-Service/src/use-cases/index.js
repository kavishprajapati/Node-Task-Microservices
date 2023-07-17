const { EmployeeTable } = require('../data-access')
const Joi = require('joi');

const { assignRole } = require('./role-usecase')
const { getCompanyId } = require('../internal-service-call')
const { createRole } = require('./role-usecase') //this i am requiring bcoz while employee is created when creating a company first time, and when employee is created role should also be created first time.
const makeCreateEmployee = require('./create-employee')
const createEmployee = makeCreateEmployee({ EmployeeData: EmployeeTable.createEmployee, Joi, getCompanyId, createRole, assignRole })


const makeGetAllEmployee = require('./get-all-employee')
const getAllEmployee = makeGetAllEmployee({ EmployeeData: EmployeeTable.getAllEmployee })


const makeDeleteEmployee = require('./delete-employee')
const deleteEmployee = makeDeleteEmployee({ EmployeeData: EmployeeTable.deleteEmployee, Joi })


const makeUpdateEmployee = require('./update-employee')
const updateEmployee = makeUpdateEmployee({ EmployeeData: EmployeeTable.updateEmployee, Joi })

const { getCompanyData } = require('../internal-service-call') //this internal service call is called while creating a employee , and it needs a company_id, not used while creating a Roles and assigning a roles.
const makeGetEmployeeDataById = require('./get-data-by-id')
const getEmployeeDataById = makeGetEmployeeDataById({ EmployeeData: EmployeeTable.getEmployee, getCompanyData ,Joi })

const  makeDeleteEmployeesByCompanyId = require('./delete-employees-by-companyId')
const  deleteEmployeesByCompanyId = makeDeleteEmployeesByCompanyId({EmployeeData: EmployeeTable.deleteEmployeesByCompanyId, Joi})



module.exports = { createEmployee,  getAllEmployee, deleteEmployee, updateEmployee, getEmployeeDataById, deleteEmployeesByCompanyId } 
