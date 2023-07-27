const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateRole = require('./update-role');
const { roleName, permission } = require('./create-role.spec');

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    updateRole: () => {}
}

const updateRoleStub = sandbox.stub(EmployeeTable, 'updateRole')

updateRoleStub.callsFake((args) => {
    expect(args).deep.equal({
        roleName: args.roleName,
        permission: args.permission,
        id: args.id
    })
})

//first scenario for invalid details
Given('role details roleName:{string}, permission:{string}, id:{string} to update role', (roleName, permission, id) => {
    this.id = id || undefined,
    this.roleName = roleName || undefined,
    this.permission = permission || undefined
})

When('Try to update role of employee with invalid details', async() => {
    const updateRole = makeUpdateRole({ EmployeeTable, Joi })

    try{
        this.result = await updateRole({
            roleName: this.roleName,
            permission: this.permission,
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while updating a role details', (message) => {
    expect(this.error).to.be.eql(message)
})

//second scenario for valid details
Given('role details roleName:{string}, permission:{string}, id:{string} to update role successfully', (roleName, permission, id) => {
    this.id = id || undefined,
    this.roleName = roleName || undefined,
    this.permission = JSON.parse(permission) || undefined
})

When('Try to update role of employee with valid details', async() => {
    const updateRole = makeUpdateRole({ EmployeeTable, Joi })

    try{
        this.result = await updateRole({
            roleName: this.roleName,
            permission: this.permission,
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will update a role details with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})