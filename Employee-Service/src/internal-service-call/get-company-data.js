module.exports = function makeGetCompanyData({ axios }) {

    return async function getCompanyData({ cmpid }) {
        try {

            
            const response = await axios.get(`http://localhost:9090/company/${cmpid}`);
        
            const CompanyData = response.data.data.companyData

            // const data = response.data.data.companyData
            // const id = data[0].id


        

            // const companyData = response.data;
            // if (companyData.data.item.length === 0 ){
            //     throw new Error("company data not found")
            // }
            return CompanyData
        }
        catch (err) {
            throw err
        }
    }
}
