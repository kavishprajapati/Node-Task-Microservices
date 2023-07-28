const { Given, When, Then, BeforeAll, Before, AfterAll, After } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateEmployee = require('./update-employee')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    updateEmployee: () => {}
}

let updateEmployeeStub;

BeforeAll(() => {
    updateEmployeeStub = sandbox.stub(EmployeeTable, 'updateEmployee')
})

Before(() => {
    updateEmployeeStub.callsFake((args) => {
        expect(args).deep.equal({
            updateData: args.updateData,
            id: args.id
        })
    })
})

After(() => {
    this.updateData = undefined;
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore() );

Given('Employee details updateData:{string}, id:{string} to update employee', (updateData, id) => {
    this.updateData = JSON.parse(updateData) || undefined
    this.id = id || undefined
})

When('Try to update employee data', async() => {
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

//First Scenario
Then('It will throw error with message: {string} while updating a employee details', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second Scenario with valid data
Then('It will update employee data with message:{string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
