module.exports = function makeGetAllCompany({ companyTable }){
    return async function getAllCompany(){
        try{
            const companyData =  await companyTable.getAllCompanyData();

            if(!companyData.length === 0){
                throw new Error("No company data found")
            }

            return companyData
            
        }
        catch(err){
            throw err
        }
    }
}
