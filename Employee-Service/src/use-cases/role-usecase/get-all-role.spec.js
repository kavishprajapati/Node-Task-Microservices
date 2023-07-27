const { When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const makeGetAllRoleDetails = require('./get-all-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getAllRoleDetails: () => { }
}

const getAllRoleDetailsStub = sandbox.stub(EmployeeTable, 'getAllRoleDetails')

When('I request to get all Role', async() => {
    const getAllRoleDetails = makeGetAllRoleDetails({ EmployeeTable })

    try{
        getAllRoleDetailsStub.returns([
            {
                role_id: "0a3a88db-8fc4-4b75-ac8b-ee3c83f5a2d6"
            }
        ])

        this.result = await getAllRoleDetails()

    }
    catch(err){
        this.error = err
    }
})

Then('I should get all Role', () => {
    expect(this.result).to.not.be.empty;
})