const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetCompany = require('./get-company')

const sandbox = sinon.createSandbox()

const companyTable = {
    getCompanyData: () => {}
}

const getCompanyStub = sandbox.stub(companyTable, "getCompanyData")

getCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
        id: args.id
    })
    return "Got company data successfully"
})

//first scenario
Given ('company details id:{string} to get company data successfully', (id) => {
    this.id = id || undefined
})

When ('Try to get company data with invalid id', async() => {
    const getCompany = makeGetCompany({ companyTable, Joi })

    try{
        this.result = await getCompany({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string} while getting company data', (message) => {
    expect(this.error).to.be.eql(message)
})

//second scenario
Given ('existing company details id:{string} to get company data successfully', (id) => {
    this.id = id || undefined
})

When('Try to get company data with valid id', async() => {
    const getCompany = makeGetCompany({ companyTable, Joi })

    try{
        this.result = await getCompany({
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will get company data with message: {string}', (message) => {
    expect(this.result).to.be.eql(message)
})