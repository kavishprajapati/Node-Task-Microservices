const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const makeGetAllUser = require('./get-all-user')

const sandbox = sinon.createSandbox()

const userTable = {
    getAllUser: () => { }
}

const getAllUserStub = sandbox.stub(userTable, 'getAllUser')

When ('I request to get all users', async () => {
    const getAllUser = makeGetAllUser({ userTable })

    try{
        getAllUserStub.returns([
            {
               userid: "02d39e89-6aa8-4ae6-8ab0-0f1f2d3b2dc0",
               username: "krushanu",
               useremail: "krushanu@rapidops.com",
               password: "2b$10$CpSNqQ2RMxxYPvM6MipgOexI3.l8GZEfjLu.dUjV/ABPm/OGBrDka" 
            }
        ])

        this.result = await getAllUser()
    }
    catch(err){
        this.error = err
    }
})

Then('I should get all users', () => {
    expect(this.result).to.not.be.empty;
})

