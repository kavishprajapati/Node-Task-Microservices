const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makedeleteAssignedRole = require('./delete-assigned-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    deleteAssignedrole: () => {
    }
}

const deleteAssignedroleStub = sandbox.stub(EmployeeTable, 'deleteAssignedrole')

deleteAssignedroleStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: args.id
    })
})

//first scenario for invalid id
Given('Role details id:{string} to delete assgined role', (id) => {
    this.id = id || undefined
})

When('Try to delete assigned role with invalid id', async() => {
    const deleteAssignedrole = makedeleteAssignedRole({ EmployeeTable, Joi })

    try{
        this.result = await deleteAssignedrole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while deleting assgined role', (message)=>{
    expect(this.error).to.be.eql(message)
})

//second scenario with valid id
Given('Role details id:{string} to delete assgined role successfully', (id) => {
    this.id = id || undefined
})

When('Try to delete assigned role with valid id', async() => {
    const deleteAssignedrole = makedeleteAssignedRole({ EmployeeTable, Joi })

    try{
        this.result = await deleteAssignedrole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will delete assigned role with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})