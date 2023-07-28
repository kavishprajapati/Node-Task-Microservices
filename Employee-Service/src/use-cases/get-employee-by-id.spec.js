// const { Given, When, Then } = require('cucumber')
// const sinon = require('sinon')
// const expect = require('chai').expect;
// const Joi = require('joi')
// const makeGetEmployeeDataById = require('./get-employee-by-id')

// const sandbox = sinon.createSandbox()

// const EmployeeTable = {
//     getEmployee: () => {}
//   };

// const getCompanyDataDb = {
//     getCompanyData: () => {} 
// }

// const getEmployeeStub = sandbox.stub(EmployeeTable, "getEmployee")

// getEmployeeStub.callsFake((args) => {
//     expect(args).deep.equal({
//         id: args.id
//     })
//     // return "Got employee data successfully"
// })

// const getCompanyDataStub = sandbox.stub(getCompanyDataDb, 'getCompanyData')

// getCompanyDataStub.callsFake((args) => {
//     expect(args).deep.equal({
//         companyId: '10931d13-2632-4861-aefb-914f9c74f0dd'
//     })
//     return [
//         {
//           id: '3d8021d4-10af-461e-956a-92faa2b6447b',
//           name: 'Rapidops',
//           city: 'Ahemdabad',
//           address: 'Scince city',
//           contact: '9898989898'
//         }
//       ]
// })


// //first scenario
// Given('employee details id:{string} to get employee data', (id)=>{
//     this.id = id || undefined
// })

// When('Try to get employee data with invalid id', async() => {
//     const getEmployee = makeGetEmployeeDataById({ EmployeeTable, Joi, getCompanyData: getCompanyDataDb.getCompanyData })

//     try{
//         this.result = await getEmployee({
//             id: this.id
//         })
//     }
//     catch(err){
//         this.error = err
//     }
// })

// Then('It will throw error with message: {string} while getting employee data', (message) => {
//     expect(this.error).to.be.eql(message)
// })

// //second scenario
// Given('existing employee details id:{string} to get employee data successfully', (id) => {
//     this.id = id || undefined
// })

// When('Try to get employee data with valid id', async() => {
//     const getEmployee = makeGetEmployeeDataById({ EmployeeTable, Joi, getCompanyData: getCompanyDataDb.getCompanyData })

//     try{
//         this.result = await getEmployee({
//             id: this.id
//         })
//     }
//     catch(err){
//         this.error = err
//     }
// })

// Then('It will get employee data with message: {string}', (message) => {
//     console.log(this.result);
//     expect(this.result).to.be.eql(message)
// })

// // //error coming in 2 scenario

const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetEmployeeDataById = require('./get-employee-by-id')

const sandbox = sinon.createSandbox()

const EmployeeTable = {
    getEmployee: () => {}
};

const getCompanyDataDb = {
    getCompanyData: () => {}
};

const getEmployeeStub = sandbox.stub(EmployeeTable, "getEmployee")

getEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })
    // return "Got employee data successfully"
})

const getCompanyDataStub = sandbox.stub(getCompanyDataDb, 'getCompanyData')

getCompanyDataStub.callsFake((args) => {
    expect(args).deep.equal({
        companyId: '10931d13-2632-4861-aefb-914f9c74f0dd'
    })
    return [
        {
            id: '3d8021d4-10af-461e-956a-92faa2b6447b',
            name: 'Rapidops',
            city: 'Ahemdabad',
            address: 'Scince city',
            contact: '9898989898'
        }
    ]
})

//first scenario
Given('employee details id:{string} to get employee data', (id) => {
    this.id = id || undefined
})

When('Try to get employee data with invalid id', async () => {
    const getEmployee = makeGetEmployeeDataById({ EmployeeTable, Joi, getCompanyData: getCompanyDataDb.getCompanyData })

    try {
        this.result = await getEmployee({
            id: this.id
        })
    }
    catch (err) {
        this.error = err
    }
})

Then('It will throw error with message: {string} while getting employee data', (message) => {
    expect(this.error).to.be.eql(message)
})

//second scenario
Given('existing employee details id:{string} to get employee data successfully', (id) => {
    this.id = id || undefined
})

When('Try to get employee data with valid id', async () => {
    const getEmployee = makeGetEmployeeDataById({ EmployeeTable, Joi, getCompanyData: getCompanyDataDb.getCompanyData })

    try {
        this.result = await getEmployee({
            id: this.id
        })
    }
    catch (err) {
        this.error = err
    }
})

Then('It will get employee data with message: {string}', (message) => {
    const expectedData = [
        {
            empid: '1872cdf4-2f69-4709-a48f-61d75769cc77',
            empname: 'kavish',
            contact: '9898989898',
            role: 'admin',
            name: 'Rapidops',
            city: 'Ahemdabad',
            address: 'Scince city'
        }
    ];

    expect(this.result).to.deep.equal(expectedData);
})
