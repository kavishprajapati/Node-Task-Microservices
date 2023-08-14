const { Given, When, Then, BeforeAll, Before, AfterAll, After } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateUser = require('./update-user')

const sandbox = sinon.createSandbox();

const userTable = {
    updateUser: () => { }
}

let updateUserStub;

BeforeAll(() => {
    updateUserStub = sandbox.stub(userTable, 'updateUser')
})

Before(() => {
    updateUserStub.callsFake((args)=>{
        expect(args).deep.equal({
            updateUserData: args.updateUserData,
            id: args.id
        })
        return "user data updated successfully";
    })
})

After(() => {
    this.updateUserData = undefined;
    this.id = undefined;
    this.error = undefined;
    this.result = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('user details updateUserData:{string}, id:{string} to update user', (updateUserData, id) => {
    this.updateUserData = JSON.parse(updateUserData) || undefined,
    this.id = id || undefined
})

When('Try to update user data', async() => {
    const updateUser = makeUpdateUser({ userTable, Joi })
    
    try{
        this.result = await updateUser({
            updateUserData: this.updateUserData,
            id: this.id
        })
    }
    catch(err){
        this.result = undefined;
        this.error = err
    }
})

//first scenario with invalid data
Then('It will throw error with message: {string} while updating a user details', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario with valid data
Then('It will update user data with message:{string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
