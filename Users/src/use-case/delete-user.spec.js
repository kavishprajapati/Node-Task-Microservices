const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteUser = require('./delete-user')

const sandbox = sinon.createSandbox()

const userTable = {
    deleteUser: () => { }
}

const deleteUserStub = sandbox.stub(userTable, 'deleteUser')

deleteUserStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })
})

//first scenario for invalid id
Given('user details id:{string} to delete user', (id) => {
    this.id = id || undefined
})

When('Try to delete user with invalid id', async () => {
    const deleteUser = makeDeleteUser({ userTable, Joi })

    try{
        this.result = await deleteUser({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while deleting company', (message) => {
    expect(this.error).to.be.eql(message)
})


//second scenario for valid id
Given('user details id:{string} to delete user successfully', (id) => {
    this.id = id || undefined
})

When('Try to delete user with valid id', async () => {
    const deleteUser = makeDeleteUser({ userTable, Joi })

    try{
        this.result = await deleteUser({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while deleting user successfully', (message) => {
    expect(this.result).to.be.eql(message)
})
