const express = require('express')
const router = express.Router()

const Controller = require('./controller')

const controller = require('./controller/Role-Controller')

const { validateMiddleware } = require('./middleware')


router 
    .get('/Employee', (req, res, next) => validateMiddleware(req, res, next, {permission: "employee.read"}), Controller.getAllEmployeeAction)
    .get('/Employee/:id', (req, res, next) => validateMiddleware(req, res, next, {permission: "employee.read"}), Controller.getEmployeeDataByIdAction)
    .post('/Employee', (req, res, next) => validateMiddleware(req, res, next, {permission: "employee.create"}),Controller.createEmployeeAction)
    .delete('/Employee/:id', (req, res, next) => validateMiddleware(req, res, next, {permission: "employee.delete"}), Controller.deleteEmployeeAction)
    .patch('/Employee/:id', (req, res, next) => validateMiddleware(req, res, next, {permission: "employee.update"}) ,Controller.updateEmployeeAction)
    //for role api endpoints
    .post('/role/:id', (req, res, next) => validateMiddleware(req, res, next, {permission: "role.create"}), controller.createRoleAction)
    .get('/role', (req, res, next) => validateMiddleware(req, res, next, {permission: "role.read"}), controller.getAllRoleDetailsAction)
    .delete('/role/:id',  (req, res, next) => validateMiddleware(req, res, next, {permission: "role.delete"}), controller.deleteRoleAction)
    .patch('/role/:id', (req, res, next) => validateMiddleware(req, res, next, {permission: "role.update"}), controller.updateRoleAction)
    .get('/role/:id', (req, res, next) => validateMiddleware(req, res, next, {permission: "role.read"}) ,controller.getRoleDataIdAction)
    // assign role api
    .post('/role', controller.assignRoleAction)
    .get('/assignedrole', controller.getAssignedRoleAction)
    .delete('/assignedrole/:id', controller.deleteAssignedRoleAction)

    //this endpoint will be accessed while calling endpoint is called through internal-service-call
    .post('/public/Employee', (req, res, next) => validateMiddleware(req, res, next, public = true,{permission: "employee.create"}),Controller.createEmployeeAction)
    
module.exports = router



