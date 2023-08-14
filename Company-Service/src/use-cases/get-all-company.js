module.exports = function makeGetAllCompany({ companyTable }){
    return async function getAllCompany(){
        try{
            const companyData =  await companyTable.getAllCompanyData();
            return companyData  
        }
        catch(err){
            throw err
        }
    }
}