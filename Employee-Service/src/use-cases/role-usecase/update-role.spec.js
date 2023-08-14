const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateRole = require('./update-role');
const { roleName, permission } = require('./create-role.spec');

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    updateRole: () => {}
}

let updateRoleStub;

BeforeAll(() => {
    updateRoleStub = sandbox.stub(EmployeeTable, 'updateRole')
})

Before(() => {
    updateRoleStub.callsFake((args) => {
        expect(args).deep.equal({
            roleName: args.roleName,
            permission: args.permission,
            id: args.id
        })

        return "Role is updated";
    })
})

After(() => {
    this.id = undefined;
    this.roleName = undefined;
    this.permission = undefined;
    this.result = undefined;
    this.error = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore())

//first scenario for invalid details
Given('role details roleName:{string}, permission:{string}, id:{string} to update role', (roleName, permission, id) => {
    this.id = id || undefined,
    this.roleName = roleName || undefined,
    this.permission = JSON.parse(permission) || undefined
})

When('Try to update role of employee', async() => {
    const updateRole = makeUpdateRole({ EmployeeTable, Joi })

    try{
        this.result = await updateRole({
            roleName: this.roleName,
            permission: this.permission,
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while updating a role details', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario for valid details
Then('It will update a role details with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})