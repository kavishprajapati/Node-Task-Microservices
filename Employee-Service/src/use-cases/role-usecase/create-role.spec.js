const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateRole = require('./create-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    createRole: () => {}
}

let createRoleStub;

BeforeAll(() => {
    createRoleStub = sandbox.stub(EmployeeTable, 'createRole')
})

Before(() => {
    createRoleStub.callsFake((args) => {
        console.log({args});
        expect(args).deep.equal({
            roleName: args.roleName,
            companyid: args.companyid,
            permission: args.permission
        })
        return "New Role Is Created"
    })
})

After(() => {
    this.companyid = undefined;
    this.roleName = undefined;
    this.permission = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('Role details companyid:{string}, roleName:{string}, permission:{string} to create role', async (companyid, roleName, permission) => {
    console.log('11111111111111111');
    console.log({permission});
    console.log({companyid});
    console.log({roleName});  
    this.companyid = companyid || undefined;
    this.roleName = roleName || undefined;
    this.permission = JSON.parse(permission) || undefined;
})

When('Try to create Role', async() => {
    const createRole = makeCreateRole({ EmployeeTable, Joi })
    
    try{
        this.result = await createRole({
            roleName: this.roleName,
            companyid: this.companyid,
            permission: this.permission
        })
    }
    catch(err){
        this.result = undefined;
        this.error = err
    }
})

//This is for invalid scenario
Then('It will throw error with message: {string} while creating new role', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//this is for valid scenario
Then('It will create role Successfully with message:{string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})
