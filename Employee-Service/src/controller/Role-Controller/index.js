const { createRole, getAllRoleDetails, deleteRole, updateRole, getRoleDataById, assignRole,  getAssignedRole, deleteAssignedRole} = require('../../use-cases/role-usecase')

const makeCreateRoleAction = require('./create-role')
const createRoleAction = makeCreateRoleAction({ createRole })

const makeGetAllRoleDetailsAction = require('./get-all-role')
const getAllRoleDetailsAction = makeGetAllRoleDetailsAction({ getAllRoleDetails })

const makeDeleteRoleAction = require('./delete-role')
const deleteRoleAction = makeDeleteRoleAction({ deleteRole })

const makeUpdateRoleAction = require('./update-role')
const updateRoleAction = makeUpdateRoleAction({ updateRole })

const makeGetRoleDataByIdAction = require('./get-by-id')
const getRoleDataIdAction = makeGetRoleDataByIdAction({ getRoleDataById })

const makeAssignRoleAction = require('./assign-role')
const assignRoleAction = makeAssignRoleAction({ assignRole })

const makeGetAssignedRoleAction = require('./get-all-Assigned-Role')
const getAssignedRoleAction = makeGetAssignedRoleAction({ getAssignedRole })

const makeDeleteAssignedRoleAction = require('./delete-assigned-role')
const deleteAssignedRoleAction = makeDeleteAssignedRoleAction({ deleteAssignedRole })

module.exports = { createRoleAction, getAllRoleDetailsAction, deleteRoleAction, updateRoleAction, getRoleDataIdAction, assignRoleAction, getAssignedRoleAction, deleteAssignedRoleAction}