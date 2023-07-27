const { When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const makeGetAssignedRole = require('./get-all-Assigned-Role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getAssignedRole: () => { }
}

const getAssignedRoleStub = sandbox.stub(EmployeeTable, 'getAssignedRole')

When('I request to get all Assigned Role', async() => {
    const getAssignedRole = makeGetAssignedRole({ EmployeeTable })

    try{
        getAssignedRoleStub.returns([
            {
                id: "0a3a88db-8fc4-4b75-ac8b-ee3c83f5a2d6",
                role_id: "0f3ae90e-97e2-4fe8-8b33-e603d99dee55",
                employee_id: "35416500-da4e-453c-a44f-a859315df8f6"
            }
        ])

        this.result = await getAssignedRole()

    }
    catch(err){
        this.error = err
    }
})

Then('I should get all Assigned Role', () => {
    console.log(this.result);
    expect(this.result).to.not.be.empty;
})