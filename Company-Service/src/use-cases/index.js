const { companyTable } = require('../data-access')
const Joi = require('joi');

//for get all
const makeGetAllCompany = require('./get-all-company')
const getAllCompany = makeGetAllCompany({ companyData: companyTable.getAllCompanyData })

//for specific id
const makeGetCompany = require('./get-company')
const getCompany = makeGetCompany({companyData: companyTable.getCompanyData, Joi})

//for create 
const { internalCallCreateEmployee } = require('../internal-service-call')
const makeCreateCompany = require('./create-company')
const createCompany = makeCreateCompany({ companyData: companyTable.createCompany, Joi, internalCallCreateEmployee })

//for delete
const producer  = require('./producer')
const makeDeleteCompany = require('./delete-company')
const deleteCompany = makeDeleteCompany({ companyData: companyTable.deleteCompany, Joi, producer })

// for update
const makeUpdateCompany = require('./update-company')
const updateCompany = makeUpdateCompany({ companyData: companyTable.updateCompany, Joi })

// get-data-by-name
const makeGetDataByName = require('./get-by-name')
const getDataByName = makeGetDataByName({ companyData: companyTable.getDataByName, Joi })


module.exports = { getAllCompany, getCompany, getDataByName, createCompany, deleteCompany, updateCompany }