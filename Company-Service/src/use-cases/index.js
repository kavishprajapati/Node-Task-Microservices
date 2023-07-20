const { companyTable } = require('../data-access')
const Joi = require('joi');
const { createEmployee } = require('../internal-service-call')
const producer  = require('../utility/producer')

//for get all
const makeGetAllCompany = require('./get-all-company')
const getAllCompany = makeGetAllCompany({ companyTable })

//for specific id
const makeGetCompany = require('./get-company')
const getCompany = makeGetCompany({companyTable, Joi})

//for create
const makeCreateCompany = require('./create-company')
const createCompany = makeCreateCompany({ companyTable, Joi, createEmployee })

//for delete
const makeDeleteCompany = require('./delete-company')
const deleteCompany = makeDeleteCompany({ companyTable, Joi, producer })

// for update
const makeUpdateCompany = require('./update-company')
const updateCompany = makeUpdateCompany({ companyTable, Joi })

// get-data-by-name
const makeGetCompanyByName = require('./get-company-by-name')
const getCompanyByName = makeGetCompanyByName({ companyTable, Joi })


module.exports = { getAllCompany, getCompany, getCompanyByName, createCompany, deleteCompany, updateCompany }