const { Given, When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateCompany = require('./create-company')

const sandbox = sinon.createSandbox();

const companyTable = {
    createCompany: () => { }
}

const createEmployeeDb = {
    createEmployee: () => { }
}

const createCompanyStub = sandbox.stub(companyTable, "createCompany")

createCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
        name: args.name,
        city: args.city,
        address: args.address,
        contact: args.contact
    })
})

const createEmployeeStub = sandbox.stub(createEmployeeDb, "createEmployee")

createEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
        id: '1872cdf4-2f69-4709-a48f-61d75769cc70'
    })
})

Given('Company details name:{string}, city:{string}, address:{string}, contact:{string} to create company', (name, city, address, contact) => {
        this.name = name || undefined, 
        this.city = city || undefined, 
        this.address = address || undefined, 
        this.contact = contact || undefined
    }
)

When("Try to create new company", async () => {
    const createCompany = makeCreateCompany({ companyTable, Joi, createEmployeeDb })

    try {
        this.result = await createCompany({
            name: this.name,
            city: this.city,
            address: this.address,
            contact: this.contact
        })   
    }
    catch (err) {
        this.error = err
    }
})

Then('It will throw error with message: {string} while creating new company', (message) => {
    expect(this.error).to.be.eql(message);
});



//Second
Given ('Company details name:{string}, city:{string}, address:{string}, contact:{string} to create new company Successfully', (name, city, address, contact) => {
        this.name = name || undefined,
        this.city = city || undefined,
        this.address = address || undefined,
        this.contact = contact || undefined
    }
)

When ('Try to create new company with valid data', async () => {
    const createCompany = makeCreateCompany({ companyTable, Joi, createEmployeeDb })

    try {
        this.result = await createCompany({
            name: this.name,
            city: this.city,
            address: this.address,
            contact: this.contact
        })  
    }
    catch (err) {
        this.error = err
    }
})

Then('It will create new company with details:{string}', (message) => {
    expect(message).to.be.eql("New Company Created Successfully");
})