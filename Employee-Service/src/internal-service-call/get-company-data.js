module.exports = function makeGetCompanyData({ axios, config }) {

    return async function getCompanyData({ companyId }) {
        try {

            
            // const response = await axios.get(`http://localhost:9090/company/${companyId}`); //this is the way i use to use axios request
        
            const response = await axios({
                method: 'get',
                url: `${config.serviceEndpoints.company}/${companyId}`
            })

            const companyData = response.data.data.companyData
    
            if ( !companyData || !companyData.data.item ){
                throw new Error("company data not found")
            }

            return companyData
        }
        catch (err) {
            throw err
        }
    }
}
