const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteEmployee = require('./delete-employee')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    deleteEmployee: () => {}
}

const deleteEmployeeStub = sandbox.stub(EmployeeTable, 'deleteEmployee')

deleteEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })
})

// for invalid scenario
Given('employee details id:{string} to delete employee', (id) => {
    this.id = id || undefined
})

When('Try to delete employee with invalid id', async() => {
    const deleteEmployee = makeDeleteEmployee({ EmployeeTable, Joi })

    try{
        this.result = await deleteEmployee({
            id: this.id
        })
     }
     catch(err){
        this.error = err
     }
})

Then('It will throw error with message: {string} while deleting employee', (message) => {
    expect(this.error).to.be.eql(message)
})

//for valid scenario
Given('employee details id:{string} to delete employee successfully', (id) => {
    this.id = id || undefined
})

When('Try to delete employee with valid id', async() => {
    const deleteEmployee = makeDeleteEmployee({ EmployeeTable, Joi })

    try{
        this.result = await deleteEmployee({
            id: this.id
        })
     }
     catch(err){
        this.error = err
     }
})

Then('It will delete employee with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})