const { Given, When, Then, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUserLogin = require('./login-user')

const sandbox = sinon.createSandbox()

const mockUserData = {
    userid: 'b388be83-27e3-4ae7-bdff-1c64e305ab4a',
    username: 'kavish',
    useremail: 'kavishprajapati@rapidops.com',
    password: '$2b$10$GLONbdZDjucVI27zXghlceAAJaeScRVg7xCP3AGUwnqrsghmhv/IO' // hashed password, adjust it as per actual data
  };
  

const userTable = {
    getUserByName: sandbox.stub().resolves([mockUserData]), // Stub the getUserByName function and make it resolve with the mock data
    storeUserjwtToken: sandbox.stub(),  
}

const bcrypt = {
    compare: sandbox.stub().resolves(true) // Stub the bcrypt.compare function and make it resolve with 'true'
};

const jwt = {
    sign: sandbox.stub().returns('mocked-jwt-token'), //Stub the jwt.sign function and make it return a predefined token
};

const sendMail = sandbox.stub();

After(() => {
    this.username = undefined;
    this.password = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore() )

Given('User credentails username:{string}, password:{string} to login', (username, password) => {
    this.username = username || undefined;
    this.password = password || undefined;
});

When('User try to login', async () => {
    const userLogin = makeUserLogin({ userTable, Joi, bcrypt, jwt, sendMail });
    
    try {
        this.result = await userLogin({ username: this.username, password: this.password });
    }
    catch (err) {
        this.error = err;
    }
})

//for invalid scenario
Then('It will throw error with message: {string} while user login', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//for valid scenario
Then('User will login successfully with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect("User loggedIn successfully").to.be.eql(message)
})