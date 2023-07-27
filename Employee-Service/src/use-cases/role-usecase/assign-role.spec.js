const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeAssignRole = require('./assign-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    assignRole: () => {}
}

const assignRoleStub = sandbox.stub(EmployeeTable, 'assignRole')

assignRoleStub.callsFake((args) => {
    expect(args).deep.equal({
        roleid: args.roleid,
        employeeid: args.employeeid
    })
})

//this is first scenario where details is invalid
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

Then('It will throw error with message: {string} while assign role to employee', (message) => {
    expect(this.error).to.be.eql(message)
})

// second scenario with valid details
Given('Assign role details roleid:{string}, employeeid:{string} to assign role to employee Successfully', (roleid, employeeid) => {
    this.roleid = roleid || undefined,
    this.employeeid = employeeid || undefined
})

When('Try to asign role to an employee with valid details', async() => {
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

Then('It will assign role to an employee with message:{string}', (message) => {
    expect(this.result).to.be.eql(message)
})