const { userTable } = require('../data-access')
const Joi = require('joi')
const bcrypt = require('bcrypt')


const makeCreateUser = require('./create-user')
const createUser = makeCreateUser({ userData: userTable.createUser, Joi })

const makeGetAllUser = require('./get-all-user')
const getAllUser = makeGetAllUser({ userData: userTable.getAllUser, Joi })

const makeGetUserDataById = require('./get-user-data-by-id')
const getUserDataById = makeGetUserDataById({ userData: userTable.getUserDataById, Joi })

const makeDeleteUser = require('./delete-user')
const deleteUser = makeDeleteUser({ userData: userTable.deleteUser, Joi })

const makeUpdateUser = require('./update-user')
const updateUser = makeUpdateUser({ userData: userTable.updateUser, Joi })

const nodemailer = require('nodemailer');
const makeSendMail = require('./send-mail')
const sendMail = makeSendMail({ nodemailer })

const jwt = require('jsonwebtoken');
const makeUserLogin = require('./login-user')
const userLogin = makeUserLogin({ checkUserInDb: userTable.getUserByName, storeJWTToken: userTable.storeUserjwtToken, Joi, bcrypt, jwt, sendMail })


module.exports = { createUser, getAllUser, getUserDataById, deleteUser, updateUser, userLogin, sendMail }