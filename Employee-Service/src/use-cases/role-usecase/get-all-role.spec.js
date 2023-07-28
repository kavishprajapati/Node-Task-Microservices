const { When, Then, BeforeAll, Before, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const makeGetAllRoleDetails = require('./get-all-role')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getAllRoleDetails: () => { }
}

let getAllRoleDetailsStub;

BeforeAll(() => {
    getAllRoleDetailsStub = sandbox.stub(EmployeeTable, 'getAllRoleDetails')
})

Before(() => {
    getAllRoleDetailsStub.callsFake(() => {
        return [
            {
                role_id: "0a3a88db-8fc4-4b75-ac8b-ee3c83f5a2d6"
            }
        ]
    })
})

When('I request to get all Role', async() => {
    const getAllRoleDetails = makeGetAllRoleDetails({ EmployeeTable })

    try{

        this.result = await getAllRoleDetails()

    }
    catch(err){
        this.error = err
    }
})

Then('I should get all Role', () => {
    expect(this.result).to.not.be.empty;
})