const { createUser, getAllUser, getUserDataById, deleteUser, updateUser, userLogin } = require('../use-case')

const makeCreateUserAction = require('./create-user')
const createUserAction = makeCreateUserAction({ createUser })

const makeGetAllUserAction = require('./get-all-user')
const getAllUserAction = makeGetAllUserAction({ getAllUser })

const makeGetUserDataByIdAction = require('./get-user-data-by-id')
const getUserDataByIdAction = makeGetUserDataByIdAction({ getUserDataById })

const makeDeleteUserAction = require('./delete-user')
const deleteUserAction = makeDeleteUserAction({ deleteUser })

const makeUserUpdateAction = require('./update-user')
const userUpdateAction = makeUserUpdateAction({ updateUser })

const makeUserLoginAction = require('./login-user')
const userLoginAction = makeUserLoginAction({ userLogin })

module.exports = { createUserAction, getAllUserAction, getUserDataByIdAction, deleteUserAction, userUpdateAction, userLoginAction }

