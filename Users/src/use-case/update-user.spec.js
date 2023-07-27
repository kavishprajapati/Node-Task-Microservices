const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateUser = require('./update-user')

const sandbox = sinon.createSandbox();

const userTable = {
    updateUser: () => { }
}

const updateUserStub = sandbox.stub(userTable, 'updateUser')

updateUserStub.callsFake((args)=>{
    expect(args).deep.equal({
        updateUserData: args.updateUserData,
        id: args.id
    })
})

//first scenario with invalid data
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
        this.error = err
    }
})

Then('It will throw error with message: {string} while updating a company details', (message) => {
    expect(this.error).to.be.eql(message)
})


//second scenario with valid data
Given('user details updateUserData:{string}, id:{string} to update user successfully', (updateUserData, id) => {
    this.updateUserData = JSON.parse(updateUserData) || undefined,
    this.id = id || undefined
})

When('Try to update user data successfully', async() => {
    const updateUser = makeUpdateUser({ userTable, Joi })

    try{
        this.result = await updateUser({
            updateUserData: this.updateUserData,
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will update company data with message:{string}', (message) => {
    expect(this.result).to.be.eql(message)
})