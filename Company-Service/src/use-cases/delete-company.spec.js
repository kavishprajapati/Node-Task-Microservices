const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeDeleteCompany = require('./delete-company')

const sandbox = sinon.createSandbox()

const companyTable = {
    deleteCompany: () => { }
}

const producer = {
    send: () => {},
    connect: () => {}
}

const deleteCompanyStub = sandbox.stub(companyTable, "deleteCompany")

deleteCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })
})

const producerStub = sandbox.stub(producer, "send")

producerStub.callsFake((args) => {
    return true;
})

const connectStub = sandbox.stub(producer, "connect")

connectStub.callsFake((args) => {
    return true;
})

// for invalid scenario 
Given('company details id:{string} to delete company successfully', (id) => {
    this.id = id || undefined
})

When('Try to delete company with invalid data', async () => {
    const deleteCompany = makeDeleteCompany({ companyTable, Joi, producer })

    try{
        this.result = await deleteCompany({
            id: this.id
        })
    }
    catch(err){
        this.error =  err

    }

} )

Then('It will throw error with message: {string} while deleting company', (message) => {
    expect(this.error).to.be.eql(message)
} )


//for valid scenario
Given('existing company details id:{string} to delete company successfully', (id) => {
    this.id = id || undefined
})


When ('Try to delete company with valid id', async () => {
    const  deleteCompany = makeDeleteCompany({ companyTable, Joi, producer })

    try{
        this.result = await deleteCompany({
            id: this.id
        })

    }
    catch(err){
        this.error = err
    }
} )

Then('It will delete company with message: {string}', (message) => {
    expect(this.result.message).to.be.eql(message)
})

