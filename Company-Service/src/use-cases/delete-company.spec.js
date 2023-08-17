const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('cucumber')
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

let deleteCompanyStub;
let producerStub;
let connectStub;

BeforeAll(() => {
    deleteCompanyStub = sandbox.stub(companyTable, "deleteCompany");
    producerStub = sandbox.stub(producer, "send");
    connectStub = sandbox.stub(producer, "connect")
})

Before(() => {

    deleteCompanyStub.callsFake((args) => {
        expect(args).deep.equal({
            id: args.id
        })
        
        return "Company deleted successfully";
    })

    producerStub.callsFake(() => {
        return true;
    })
    
    connectStub.callsFake(() => {
        return true;
    })

})

After(() => {
    this.id = undefined;
    this.error = undefined;
    this.result = undefined;
    sandbox.resetHistory();
})
 
AfterAll(() => {
    sandbox.restore()
})

// for invalid scenario 
Given('company details id:{string} to delete company', (id) => {
    this.id = id || undefined
})

When('Try to delete company', async () => {
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
    expect(this.result).to.be.undefined;
    expect(this.error).to.be.eql(message)
} )


//for valid scenario
Then('It will delete company with message: {string}', (message) => {
    expect(this.error).to.be.undefined
    expect(this.result).to.be.eql(message)
})

