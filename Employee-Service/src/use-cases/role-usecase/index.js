const { EmployeeTable } = require('../../data-access')
const Joi = require('joi');

const makeCreateRole = require('./create-role')
const createRole = makeCreateRole({EmployeeData: EmployeeTable.createRole, Joi})

const makeGetAllRoleDetails = require('./get-all-role')
const getAllRoleDetails = makeGetAllRoleDetails({EmployeeData: EmployeeTable.getAllRoleDetails, Joi})

const makeDeleteRole = require('./delete-role')
const deleteRole = makeDeleteRole({ EmployeeData: EmployeeTable.deleteRole, Joi})

const makeUpdateRole = require('./update-role')
const updateRole = makeUpdateRole({ EmployeeData: EmployeeTable.updateRole, Joi })

const makeGetRoleDataById = require('./get-by-id')
const getRoleDataById = makeGetRoleDataById({ EmployeeData: EmployeeTable.getRoleDataById, Joi })

const makeAssignRole = require('./assign-role')
const assignRole = makeAssignRole({ EmployeeData: EmployeeTable.assignRole, Joi })

const makeGetAssignedRole = require('./get-all-Assigned-Role')
const getAssignedRole = makeGetAssignedRole({ EmployeeData: EmployeeTable.getAssignedRole })

const makedeleteAssignedRole = require('./delete-assigned-role')
const deleteAssignedRole = makedeleteAssignedRole({ EmployeeData: EmployeeTable.deleteAssignedrole, Joi })

const makeGetByIdAssignedRole = require('./get-by-id-assign-role')
const getByIdAssignedRole = makeGetByIdAssignedRole({ EmployeeData: EmployeeTable.getByIdAssignedRole, Joi })

module.exports = {createRole, getAllRoleDetails, deleteRole, updateRole, getRoleDataById, assignRole, getAssignedRole, deleteAssignedRole, getByIdAssignedRole}