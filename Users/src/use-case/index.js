const { userTable } = require('../data-access')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const makeCreateUser = require('./create-user')
const createUser = makeCreateUser({ userTable, Joi })

const makeGetAllUser = require('./get-all-user')
const getAllUser = makeGetAllUser({ userTable, Joi })

const makeGetUserDataById = require('./get-user-data-by-id')
const getUserDataById = makeGetUserDataById({ userTable, Joi })

const makeDeleteUser = require('./delete-user')
const deleteUser = makeDeleteUser({ userTable, Joi })

const makeUpdateUser = require('./update-user')
const updateUser = makeUpdateUser({ userTable, Joi })

const makeSendMail = require('./send-mail')
const sendMail = makeSendMail({ nodemailer })

const makeUserLogin = require('./login-user')
const userLogin = makeUserLogin({ userTable, Joi, bcrypt, jwt, sendMail })


module.exports = { createUser, getAllUser, getUserDataById, deleteUser, updateUser, userLogin, sendMail }

