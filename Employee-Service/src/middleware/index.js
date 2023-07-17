const { getByIdAssignedRole, getRoleDataById } = require('../use-cases/role-usecase')


const makeValidateMiddleware = require('./verifypermission')
const validateMiddleware = makeValidateMiddleware({ getByIdAssignedRole, getRoleDataById })

module.exports = { validateMiddleware }