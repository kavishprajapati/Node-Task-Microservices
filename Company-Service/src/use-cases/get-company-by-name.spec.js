const { When, Then, BeforeAll, Before, AfterAll, After, Given } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi')
const makeGetCompanyByName = require('./get-company-by-name')

const sandbox = sinon.createSandbox()

const companyTable = {
    getCompanyByName: () => {}
}

let getCompanyByNameStub;

BeforeAll(() => {
    getCompanyByNameStub = sandbox.stub(companyTable, "getCompanyByName")
})

Before(() => {
    getCompanyByNameStub.callsFake((args) => {
        expect(args).deep.equal({
            companyname:  args.companyname,
        })
        return "Got company data successfully"
    })
})

After(() => {
    this.companyname = undefined;
    this.error = undefined;
    this.result = undefined;
    sandbox.resetHistory();
})

AfterAll(() => sandbox.restore())

Given ('company details companyname:{string} to get company data', (companyname) => {
    this.companyname = companyname || undefined
})

When ('Try to get company data', async() => {
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

//first scenario
Then('It will throw error with message: {string}', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})


//second scenario
Then('It will get company data with message: "{string}"', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})