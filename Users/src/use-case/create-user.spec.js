const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateUser = require('./create-user');


const sandbox = sinon.createSandbox();

const userTable = {
      createUser: () => { }
}

let createUserStub;

BeforeAll(() => {
    createUserStub = sandbox.stub(userTable, 'createUser')
})

Before(() => {
    createUserStub.callsFake((args) => {
        expect(args).deep.equal({
            username: args.username,
            useremail: args.useremail,
            password: args.password
        })
    })
})

After(() => {
    this.username = undefined;
    this.useremail = undefined;
    this.password = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('User details username:{string}, useremail:{string}, password:{string} to create user', async (username, useremail, password) => {
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
        this.result = undefined;
        this.error = err;
    }
})

//first scenario for invalid data
Then('It will throw error with message: {string} while create new user with invalid details', async (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})


//second scenario for valid data
Then('It will give message: {string} while create new user Successfully', async (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
