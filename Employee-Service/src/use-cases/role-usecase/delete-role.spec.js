const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteRole = require('./delete-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
     deleteRole: () => {
    }
}

const deleteRoleStub = sandbox.stub(EmployeeTable, 'deleteRole' )

deleteRoleStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: args.id
    })
})

//first scenario for invalid id
Given('Role details id:{string} to delete role', (id) => {
    this.id = id || undefined
})

When('Try to delete role with invalid id', async() => {
    const deleteRole = makeDeleteRole({ EmployeeTable, Joi })

    try{
        this.result = await deleteRole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while deleting role', (message)=>{
    expect(this.error).to.be.eql(message)
})

//second scenario with valid id
Given('Role details id:{string} to delete role successfully', (id) => {
    this.id = id || undefined
})

When('Try to delete role with valid id', async() => {
    const deleteRole = makeDeleteRole({ EmployeeTable, Joi })

    try{
        this.result = await deleteRole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will delete role with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})