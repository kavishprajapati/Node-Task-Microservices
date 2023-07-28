const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateCompany = require('./update-company');

const sandbox = sinon.createSandbox();

const companyTable = {
    updateCompany: () => { }
}

let updateCompanyStub;

BeforeAll(() => {
    updateCompanyStub = sandbox.stub(companyTable, "updateCompany")
})

Before(() => {
    updateCompanyStub.callsFake((args)=>{
        expect(args).deep.equal({
            updateData: args.updateData,
            id: args.id
        })  
    })
})

After(() => {
    this.updateData = undefined;
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
})

AfterAll(() => {
    sandbox.restore()
})

Given('Company details updateData:{string}, id:{string} to update company', (updateData, id) => {
    this.updateData = JSON.parse(updateData) || undefined
    this.id = id || undefined
})

When('Try to update company data', async() => {
    const updateCompany = makeUpdateCompany({ companyTable, Joi })
    
    try{
        this.result = await updateCompany({
            updateData: this.updateData,
            id: this.id
        })
    }
    catch(err){
        this.error = err
    }
})

//First Scenario
Then('It will throw error with message: {string} while updating a company details', (message) => {
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
})


//second scenario
Then('It will update company data with message:{string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})