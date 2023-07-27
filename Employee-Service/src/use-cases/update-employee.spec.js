const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateEmployee = require('./update-employee')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    updateEmployee: () => {}
}

const updateEmployeeStub = sandbox.stub(EmployeeTable, 'updateEmployee')

updateEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        updateData: args.updateData,
        id: args.id
    })
})

//First Scenario
Given('Employee details updateData:{string}, id:{string} to update employee', (updateData, id) => {
    this.updateData = JSON.parse(updateData) || undefined
    this.id = id || undefined
})

When('Try to update employee data with invalid data', async() => {
    const updateEmployee = makeUpdateEmployee({ EmployeeTable, Joi })

    try{
        this.result = await updateEmployee({
            updateData: this.updateData, 
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while updating a employee details', (message) => {
    expect(this.error).to.be.eql(message)
})

//second Scenario with valid data
Given('Employee details updateData:{string}, id:{string} to update employee successfully', (updateData, id) => {
    this.updateData = JSON.parse(updateData) || undefined,
    this.id = id || undefined
})

When('Try to update employee data with valid data', async() => {
    const updateEmployee = makeUpdateEmployee({ EmployeeTable, Joi })

    try{
        this.result = await updateEmployee({
            updateData: this.updateData, 
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will update employee data with message:{string}', (message) => {
    expect(this.result).to.be.eql(message)
})