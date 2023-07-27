const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateUser = require('./create-user');


const sandbox = sinon.createSandbox();

const userTable = {
      createUser: () => { }
}

const createUserStub = sandbox.stub(userTable, 'createUser')

createUserStub.callsFake((args) => {
    expect(args).deep.equal({
        username: args.username,
        useremail: args.useremail,
        password: args.password
    })
})

Given('User details username:{string}, useremail:{string}, password:{string} to create user', (username, useremail, password) => {
    this.username = username || undefined,
    this.useremail = useremail || undefined,
    this.password = password || undefined
})

When('Try to create user', async() => {
    const createUser = makeCreateUser({ userTable, Joi })

    try{
        this.result = await createUser({ 
            username: this.username,
            useremail: this.useremail,
            password: this.password
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while create new user', (message) => {
    expect(this.error).to.be.eql(message)
})




//second scenario with for valid data
Given('User details username:{string}, useremail:{string}, password:{string} to create user Successfully', (username, useremail, password) => {
    this.username = username || undefined,
    this.useremail = useremail || undefined,
    this.password = password || undefined
})

When('Try to create user with valid data', async() => {
    const createUser = makeCreateUser({ userTable, Joi })

    try{
        this.result = await createUser({
            username: this.username,
            useremail: this.useremail,
            password: this.password
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while create new user Successfully', (message) => {
    expect(this.result).to.be.eql(message)
})