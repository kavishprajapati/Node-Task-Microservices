const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetCompany = require('./get-company')

const sandbox = sinon.createSandbox()

const companyTable = {
    getCompanyData: () => {}
}

let getCompanyStub;

BeforeAll(() => {
    getCompanyStub = sandbox.stub(companyTable, "getCompanyData")
})

Before(() => {
    getCompanyStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
        return "Got company data successfully"
    })
})

After(() => {
    this.id = undefined;
    this.error = undefined;
    this.result = undefined
    sandbox.resetHistory()
})

AfterAll(() => sandbox.restore())

//first scenario
Given ('company details id:{string} to get company data', (id) => {
    this.id = id || undefined
})

When ('Try to get company data by id', async() => {
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
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})

//second scenario
Then('It will get company data with message: {string} successfully', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})