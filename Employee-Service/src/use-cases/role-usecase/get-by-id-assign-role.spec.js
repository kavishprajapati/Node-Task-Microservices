const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetByIdAssignedRole = require('./get-by-id-assign-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getByIdAssignedRole: () => {}
}

let getByIdAssignedRoleStub;

BeforeAll(() => {
    getByIdAssignedRoleStub = sandbox.stub(EmployeeTable,'getByIdAssignedRole')
})

Before(() => {
    getByIdAssignedRoleStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
    
        return "Got assign role details successfully";
    })
})

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('assign role details id:{string} to get role details', (id) => {
    this.id = id || undefined
})

When('Try to get assign role', async() => {
    const getByIdAssignedRole = makeGetByIdAssignedRole({ EmployeeTable, Joi })
    
    try{
        this.result = await getByIdAssignedRole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

//first scenario with invalid id
Then('It will throw error with message: {string} while getting assign role details', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario for valid id
Then('It will get assign role details with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
