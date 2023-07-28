const { When, Then, BeforeAll, Before, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const makeGetAllEmployee = require('./get-all-employee')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getAllEmployee: () => { } 
}

let getAllEmployeeStub;

BeforeAll(() => {
    getAllEmployeeStub = sandbox.stub(EmployeeTable, 'getAllEmployee')
})

Before(() => {
    getAllEmployeeStub.callsFake(() => {
        return [
            {
                cmpid: "3d8021d4-10af-461e-956a-92faa2b6447b",
                empid: "1872cdf4-2f69-4709-a48f-61d75769cc77",
                empname: "kavish",
                contact: "7878787878",
                role: "admin"
            }
        ];
    });
});

AfterAll(() => sandbox.restore() )

When('I request to get all Employees', async() => {
    const getAllEmployee = makeGetAllEmployee({ EmployeeTable })

    try{
        this.result = await getAllEmployee()
    }
    catch(err){
        this.error = err
    }
})

Then('I should get all Employees with message: "{string}"', (message) => {
    expect(this.result).to.be.eql(JSON.parse(message))
})