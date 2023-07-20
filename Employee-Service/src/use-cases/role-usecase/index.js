const { EmployeeTable } = require('../../data-access')
const Joi = require('joi');

const makeCreateRole = require('./create-role')
const createRole = makeCreateRole({ EmployeeTable, Joi})

const makeGetAllRoleDetails = require('./get-all-role')
const getAllRoleDetails = makeGetAllRoleDetails({ EmployeeTable, Joi})

const makeDeleteRole = require('./delete-role')
const deleteRole = makeDeleteRole({ EmployeeTable, Joi})

const makeUpdateRole = require('./update-role')
const updateRole = makeUpdateRole({ EmployeeTable, Joi })

const makeGetRoleDataById = require('./get-role-by-id')
const getRoleDataById = makeGetRoleDataById({ EmployeeTable, Joi })

const makeAssignRole = require('./assign-role')
const assignRole = makeAssignRole({ EmployeeTable, Joi })

const makeGetAssignedRole = require('./get-all-Assigned-Role')
const getAssignedRole = makeGetAssignedRole({ EmployeeTable })

const makedeleteAssignedRole = require('./delete-assigned-role')
const deleteAssignedRole = makedeleteAssignedRole({ EmployeeTable, Joi })

const makeGetByIdAssignedRole = require('./get-by-id-assign-role')
const getByIdAssignedRole = makeGetByIdAssignedRole({ EmployeeTable, Joi })

module.exports = {createRole, getAllRoleDetails, deleteRole, updateRole, getRoleDataById, assignRole, getAssignedRole, deleteAssignedRole, getByIdAssignedRole}



