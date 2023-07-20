module.exports = function makeGetAllCompany({ companyTable }){
    return async function getAllCompany(){
        try{
            return await companyTable.getAllCompanyData();
        }
        catch(err){
            throw err
        }
    }
}
