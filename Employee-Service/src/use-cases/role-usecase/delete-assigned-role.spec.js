const { Given, When, Then, BeforeAll, Before, AfterAll, After } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makedeleteAssignedRole = require('./delete-assigned-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    deleteAssignedrole: () => {
    }
}

let deleteAssignedroleStub;

BeforeAll(() => {
    deleteAssignedroleStub = sandbox.stub(EmployeeTable, 'deleteAssignedrole')
})

Before(() => {
    deleteAssignedroleStub.callsFake((args)=>{
        expect(args).deep.equal({
            id: args.id
        })
    })
})

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore())

//first scenario for invalid id
Given('Role details id:{string} to delete assgined role', (id) => {
    this.id = id || undefined
})

When('Try to delete assigned role', async() => {
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
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario with valid id
Then('It will delete assigned role with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})