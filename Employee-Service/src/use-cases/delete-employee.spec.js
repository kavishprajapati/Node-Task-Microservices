const { Given, When, Then, BeforeAll, Before, AfterAll, After } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteEmployee = require('./delete-employee')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    deleteEmployee: () => {}
}

let deleteEmployeeStub;

BeforeAll(() => {
    deleteEmployeeStub = sandbox.stub(EmployeeTable, 'deleteEmployee')
})

Before(() => {
    deleteEmployeeStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
        return "employee deleted successfully";
    })
})

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('employee details id:{string} to delete employee', (id) => {
    this.id = id || undefined
})

When('Try to delete employee', async() => {
    const deleteEmployee = makeDeleteEmployee({ EmployeeTable, Joi })
    
    try{
        this.result = await deleteEmployee({
            id: this.id
        })
    }
    catch(err){
        this.result = undefined;
        this.error = err;
    }
})

// for invalid scenario
Then('It will throw error with message: {string} while deleting employee', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//for valid scenario
Then('It will delete employee with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})