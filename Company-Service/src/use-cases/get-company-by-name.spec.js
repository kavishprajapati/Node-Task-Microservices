const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetCompanyByName = require('./get-company-by-name')

const sandbox = sinon.createSandbox()

const companyTable = {
    getCompanyByName: () => {}
}

const getCompanyByNameStub = sandbox.stub(companyTable, "getCompanyByName")

getCompanyByNameStub.callsFake((args) => {
    expect(args).deep.equal({
        companyname:  args.companyname,
    })
    return "Got company data successfully"
})

//first scenario
Given ('company details companyname:{string} to get company data successfully', (companyname) => {
    this.companyname = companyname || undefined
})

When ('Try to get company data with invalid name', async() => {
    const getCompanyByName = makeGetCompanyByName({ companyTable, Joi })

    try{
        this.result = await getCompanyByName({
            companyname: this.companyname
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will throw error with message: {string}', (message) => {
    expect(this.error).to.be.eql(message)
})


//second scenario
Given ('existing company details companyname:{string} to get company data successfully', (companyname) => {
    this.companyname = companyname || undefined
})

When ('Try to get company data with valid name', async () => {
    const getCompanyByName = makeGetCompanyByName({ companyTable, Joi })

    try{
        this.result = await getCompanyByName({
            companyname: this.companyname
        })
    }
    catch(err){
        this.error = err
    }
})

Then('It will get company data with message: "{string}"', (message) => {
    expect(this.result).to.be.eql(message)
})