const { Given, When, Then, BeforeAll, Before, AfterAll, After } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteUser = require('./delete-user')

const sandbox = sinon.createSandbox()

const userTable = {
    deleteUser: () => { }
}

let deleteUserStub

BeforeAll(() => {
    deleteUserStub = sandbox.stub(userTable, 'deleteUser')
})

Before(() => {
    deleteUserStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
    })
})

After(() => {
    this.id = undefined;
    this.error = undefined;
    this.result = undefined
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore);

Given('user details id:{string} to delete user', async (id) => {
    this.id = id || undefined;
})

When('Try to delete user', async () => {
    const deleteUser = makeDeleteUser({ userTable, Joi })
    
    try{
        this.result = await deleteUser({
            id: this.id
        })
    }
    catch(err){
        this.result = undefined;
        this.error = err;
    }
})

//first scenario for invalid id
Then('It will throw error with message: {string} while deleting company',async (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario for valid id
Then('It will throw error with message: {string} while deleting user successfully',async (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
