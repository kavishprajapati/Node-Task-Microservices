module.exports = function makeGetAllCompany({companyData}){
    return async function getAllCompany(){
        try{
            const cmpData = await companyData();
            return cmpData;
        }
        catch(err){
            throw err
        }
    }
}
