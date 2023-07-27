const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetUserDataById = require('./get-user-data-by-id')

const sandbox = sinon.createSandbox()

const userTable = {
    getUserDataById: () => {}
}

const getUserDataByIdStub = sandbox.stub(userTable, 'getUserDataById')

getUserDataByIdStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })
    return "Got user data successfully"
})

//first scenario with invalid id
Given('user details id:{string} to get user data', (id) => {
    this.id = id || undefined
})

When('Try to get user data with invalid id', async() => {
    const getUserDataById = makeGetUserDataById({ userTable, Joi })

    try{
        this.result = await getUserDataById({
            id: this.id
        })
    }
    catch(err){
        this.error = err 
    }
})

Then('It will throw error with message: {string} while getting user data', (message) => {
    expect(this.error).to.be.eql(message)
})

//second scenario with valid id
Given('user details id:{string} to get user data successfully', (id) => {
    this.id = id || undefined
})

When('Try to get user data with valid id', async() => {
    const getUserDataById = makeGetUserDataById({ userTable, Joi })

    try{
        this.result = await getUserDataById({
            id: this.id
        })
    }
    catch(err){
        this.error = err 
    }
})

Then('It will get user data with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})