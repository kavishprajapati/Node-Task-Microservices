const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteEmployeesByCompanyId = require('./delete-employees-by-companyId')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    deleteEmployeesByCompanyId: () => {}
}

const deleteEmployeesByCompanyIdStub = sandbox.stub(EmployeeTable, 'deleteEmployeesByCompanyId')

deleteEmployeesByCompanyIdStub.callsFake((args) => {
    expect(args).deep.equal({
        companyId: args.companyId
    })
})

//first scenario with invalid id.
Given('Employees details companyId:{string} to delete employees', (companyId) => {
    this.companyId = companyId || undefined
})

When('Try to delete employees with invalid companyId', async() => {
    const deleteEmployeesByCompanyId = makeDeleteEmployeesByCompanyId({ EmployeeTable, Joi })

    try{
        this.result = await deleteEmployeesByCompanyId({
            companyId: this.companyId
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while deleting employees data', (message) => {
    expect(this.error).to.be.eql(message)
})


//second scenario
Given('Employees details companyId:{string} to delete employees successfully', (companyId) => {
    this.companyId = companyId || undefined
})

When('Try to delete employees with valid companyId', async() => {
    const deleteEmployeesByCompanyId = makeDeleteEmployeesByCompanyId({ EmployeeTable, Joi })

    try{
        this.result = await deleteEmployeesByCompanyId({
            companyId: this.companyId
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will delete employees with message: {string}', (message) => {
    console.log(this.result);
    expect(this.result).to.be.eql(message)
})