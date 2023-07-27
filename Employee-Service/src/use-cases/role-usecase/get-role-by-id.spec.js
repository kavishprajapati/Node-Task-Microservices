const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetRoleDataById = require('./get-role-by-id')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getRoleDataById: () => {}
}

const getRoleDataByIdStub = sandbox.stub(EmployeeTable,'getRoleDataById')

getRoleDataByIdStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })

    return "Got role details successfully";
})

//first scenario with invalid id
Given('role details id:{string} to get role details', (id) => {
    this.id = id || undefined
})

When('Try to get role with invalid id', async() => {
    const getRoleDataById = makeGetRoleDataById({ EmployeeTable, Joi })

    try{
        this.result = await getRoleDataById({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while getting role details', (message) => {
    expect(this.error).to.be.eql(message)
})

//second scenario for valid id
Given('role details id:{string} to get role details successfully', (id) => {
    this.id = id || undefined
})

When('Try to get role details with valid id', async() => {
    const getRoleDataById = makeGetRoleDataById({ EmployeeTable, Joi })

    try{
        this.result = await getRoleDataById({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will get role details with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})
