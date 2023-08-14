const {getAllCompany, createCompany, deleteCompany, getCompany, updateCompany, getCompanyByName} = require('../use-cases')

//to get-all-data
const makeGetAllCompanyAction = require('./get-all-company')
const getAllCompanyAction = makeGetAllCompanyAction({getAllCompany})

//to-get-data-by-id
const makeGetCompanyAction = require('./get-company')
const getCompanyAction = makeGetCompanyAction({getCompany})

//to create
const makeCreateCompanyAction = require('./create-company')
const createCompanyAction = makeCreateCompanyAction({createCompany})

//to delete
const makeDeleteCompanyAction = require('./delete-company')
const deleteCompanyAction = makeDeleteCompanyAction({deleteCompany})

//to update
const makeUpdateCompanyAction = require('./update-company')
const updateCompanyAction = makeUpdateCompanyAction({updateCompany})

//get data by name
const makeGetCompanyByNameAction = require('./get-company-by-name')
const getCompanyByNameAction = makeGetCompanyByNameAction({ getCompanyByName })

module.exports = {getAllCompanyAction, getCompanyAction, createCompanyAction, deleteCompanyAction, updateCompanyAction, getCompanyByNameAction}