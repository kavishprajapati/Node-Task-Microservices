const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetRoleDataById = require('./get-role-by-id')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getRoleDataById: () => {}
}

let getRoleDataByIdStub;

BeforeAll(() => {
    getRoleDataByIdStub = sandbox.stub(EmployeeTable,'getRoleDataById')
})

Before(() => {
    getRoleDataByIdStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
    
        return "Got role details successfully";
    })
})

After(() => {
    this.id = undefined;
    this.error = undefined;
    this.result = undefined;
    sandbox.resetHistory();
})

AfterAll(() => {
    sandbox.restore()
})

Given('role details id:{string} to get role details', (id) => {
    this.id = id || undefined
})

When('Try to get role', async() => {
    const getRoleDataById = makeGetRoleDataById({ EmployeeTable, Joi })
    
    try{
        this.result = await getRoleDataById({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

//first scenario with invalid id
Then('It will throw error with message: {string} while getting role details', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario for valid id
Then('It will get role details with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
