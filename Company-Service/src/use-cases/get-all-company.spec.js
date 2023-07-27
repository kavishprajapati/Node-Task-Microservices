const { When, Then } = require('cucumber')
const sinon = require('sinon')
const expect = require('chai').expect;
const makeGetAllCompany = require('./get-all-company')

const sandbox = sinon.createSandbox();

const companyTable = {
    getAllCompanyData: () => { }
  };

const getAllCompanyStub = sandbox.stub(companyTable, 'getAllCompanyData')

When ('I request to get all companies', async () => {
    const getAllCompany = makeGetAllCompany({ companyTable })

    try{
        getAllCompanyStub.returns([
            {
                id: "10931d13-2632-4861-aefb-914f9c74f0dd",
                name: "Microsoft",
                city: "Banglore",
                address: "happy street",
                contact: "2121212121"
              }
        ])

        this.result = await getAllCompany()
    }
    catch(err){
        this.error =  err
    }
})

Then ('I should get all companies', () => {
        expect(this.result).to.not.be.empty;
})