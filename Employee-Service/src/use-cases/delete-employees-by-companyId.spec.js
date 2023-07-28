const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteEmployeesByCompanyId = require('./delete-employees-by-companyId')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    deleteEmployeesByCompanyId: () => {}
}

let deleteEmployeesByCompanyIdStub;

BeforeAll(() => {
    deleteEmployeesByCompanyIdStub = sandbox.stub(EmployeeTable, 'deleteEmployeesByCompanyId')
})

Before(() => {
    deleteEmployeesByCompanyIdStub.callsFake((args) => {
        expect(args).deep.equal({
            companyId: args.companyId
        })
    })
})

After(() => {
    this.companyId = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('Employees details companyId:{string} to delete employees', (companyId) => {
    this.companyId = companyId || undefined
})

When('Try to delete employees', async() => {
    const deleteEmployeesByCompanyId = makeDeleteEmployeesByCompanyId({ EmployeeTable, Joi })

    try{
        this.result = await deleteEmployeesByCompanyId({
            companyId: this.companyId
        })
    }
    catch(err){
        this.result = undefined;
        this.error = err
    }
})

//first scenario with invalid id.
Then('It will throw error with message: {string} while deleting employees data', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario
Then('It will delete employees with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})