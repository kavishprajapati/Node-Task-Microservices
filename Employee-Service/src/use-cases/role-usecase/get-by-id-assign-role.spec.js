const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetByIdAssignedRole = require('./get-by-id-assign-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getByIdAssignedRole: () => {}
}

const getByIdAssignedRoleStub = sandbox.stub(EmployeeTable,'getByIdAssignedRole')

getByIdAssignedRoleStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })

    return "Got assign role details successfully";
})

//first scenario with invalid id
Given('assign role details id:{string} to get role details', (id) => {
    this.id = id || undefined
})

When('Try to get assign role with invalid id', async() => {
    const getByIdAssignedRole = makeGetByIdAssignedRole({ EmployeeTable, Joi })

    try{
        this.result = await getByIdAssignedRole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while getting assign role details', (message) => {
    expect(this.error).to.be.eql(message)
})

//second scenario for valid id
Given('assign role details id:{string} to get assign role details successfully', (id) => {
    this.id = id || undefined
})

When('Try to get assign role details with valid id', async() => {
    const getByIdAssignedRole = makeGetByIdAssignedRole({ EmployeeTable, Joi })

    try{
        this.result = await getByIdAssignedRole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will get assign role details with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})
