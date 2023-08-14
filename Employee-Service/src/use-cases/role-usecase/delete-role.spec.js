const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteRole = require('./delete-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
     deleteRole: () => {
    }
}

let deleteRoleStub;

BeforeAll(() => {
    deleteRoleStub = sandbox.stub(EmployeeTable, 'deleteRole' )
})

Before(() => {
    deleteRoleStub.callsFake((args)=>{
        expect(args).deep.equal({
            id: args.id
        })
        return "role deleted successfully"
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

Given('Role details id:{string} to delete role', (id) => {
    this.id = id || undefined
})

When('Try to delete role', async() => {
    const deleteRole = makeDeleteRole({ EmployeeTable, Joi })
    
    try{
        this.result = await deleteRole({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

//first scenario for invalid id
Then('It will throw error with message: {string} while deleting role', (message)=>{
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario with valid id
Then('It will delete role with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})