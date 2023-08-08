
module.exports = function makeGetCompanyId({ axios }) {

    return async function getCompanyId({ companyName }) {
        try {

            const response = await axios.get(`http://localhost:9090/company/api/${companyName}`);
            const data = response.data.data.companyData
            const id = data[0].id
    
            return id
        }
        catch (err) {
            throw err
        }
    }

}
