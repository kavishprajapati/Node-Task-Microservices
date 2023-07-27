const express = require('express')
const router = express.Router()
const Controller = require('./controller')


router
    .post('/user', Controller.createUserAction)
    .get('/user', Controller.getAllUserAction)
    .get('/user/:id', Controller.getUserDataByIdAction)
    .delete('/user/:id', Controller.deleteUserAction)
    .patch('/user/:id', Controller.userUpdateAction)
    .post('/user/login', Controller.userLoginAction)

module.exports = router