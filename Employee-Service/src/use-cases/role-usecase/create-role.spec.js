const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateRole = require('./create-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    createRole: () => {}
}

const createRoleStub = sandbox.stub(EmployeeTable, 'createRole')

createRoleStub.callsFake((args) => {
    expect(args).deep.equal({
        roleName: args.roleName,
        companyid: args.companyid,
        permission: args.permission
    })
    return "New Role Is Created"
})

//This is for invalid scenario
Given('Role details companyid:{string}, roleName:{string}, permission:{string} to create role', (companyid, roleName, permission) => {
    this.companyid = companyid || undefined,
    this.roleName = roleName || undefined,
    this.permission = permission || undefined
})

When('Try to create Role with invalid details', async() => {
    const createRole = makeCreateRole({ EmployeeTable, Joi })

    try{
        this.result = await createRole({
            roleName: this.roleName,
            companyid: this.companyid,
            permission: this.permission
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while creating new role', (message) => {
    expect(this.error).to.be.eql(message)
})

//this is for valid scenario
Given('Role details companyid:{string}, roleName:{string}, permission:{string} to create role Successfully', (companyid, roleName, permission) => {
    this.companyid = companyid || undefined,
    this.roleName = roleName || undefined,
    this.permission = JSON.parse(permission) || undefined
})

When('Try to create role  with valid details', async() => {
    const createRole = makeCreateRole({ EmployeeTable, Joi })

    try{
        this.result = await createRole({
            roleName: this.roleName,
            companyid: this.companyid,
            permission: this.permission
        })
    }
    catch(err){
        console.log(err);
        this.error = err
    }
})

Then('It will create role Successfully with message:{string}', (message) => {
    console.log(this.result);
    expect(this.result).to.be.eql(message)
})
