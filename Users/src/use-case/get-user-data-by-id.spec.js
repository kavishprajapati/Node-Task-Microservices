const { Given, When, Then, BeforeAll, Before, AfterAll, After } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetUserDataById = require('./get-user-data-by-id')

const sandbox = sinon.createSandbox()

const userTable = {
    getUserDataById: () => {}
}

let getUserDataByIdStub

BeforeAll(() => {
    getUserDataByIdStub = sandbox.stub(userTable, 'getUserDataById')
})

Before(() => {
    getUserDataByIdStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
        return "Got user data successfully"
    })
})

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore() );

Given('user details id:{string} to get user data', (id) => {
    this.id = id || undefined
})

When('Try to get user data', async() => {
    const getUserDataById = makeGetUserDataById({ userTable, Joi })
    
    try{
        this.result = await getUserDataById({
            id: this.id
        })
    }
    catch(err){
        this.result = undefined
        this.error = err 
    }
})

//first scenario with invalid id
Then('It will throw error with message: {string}', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario with valid id
Then('It will get user data with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})