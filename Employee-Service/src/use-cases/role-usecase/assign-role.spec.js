const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeAssignRole = require('./assign-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    assignRole: () => {}
}

let assignRoleStub;

BeforeAll(() => {
    assignRoleStub = sandbox.stub(EmployeeTable, 'assignRole')
})

Before(() => {
    assignRoleStub.callsFake((args) => {
        expect(args).deep.equal({
            roleid: args.roleid,
            employeeid: args.employeeid
        })

        return "Role is assigned Successfully to an employee";
    })
})

After(() => {
    this.roleid = undefined;
    this.employeeid = undefined;
    this.error = undefined;
    this.result = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore());

Given('Assign role details roleid:{string}, employeeid:{string} to assign role to employee', (roleid, employeeid) => {
    this.roleid = roleid || undefined,
    this.employeeid = employeeid || undefined
})

When('Try to assign role to employee', async() => {
    const assignRole = makeAssignRole({ EmployeeTable, Joi })
    
    try{
        this.result = await assignRole({
            roleid: this.roleid,
            employeeid: this.employeeid
        })
    }
    catch(err){
        this.error = err
    }
})

//this is first scenario where details is invalid
Then('It will throw error with message: {string} while assign role to employee', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

// second scenario with valid details
Then('It will assign role to an employee with message:{string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})