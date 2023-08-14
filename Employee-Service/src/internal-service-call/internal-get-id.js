module.exports = function makeGetCompanyId({ axios, config }) {

    return async function getCompanyId({ companyName }) {
        try {

            // const response = await axios.get(`http://localhost:9090/company/api/${companyName}`);

            const response = await axios({
                method: 'get',
                url: `${config.serviceEndpoints.companyName}/${companyName}`
            })

            const data = response.data.data.companyData

            if(!data){
                throw new Error(" Company data not found ")
            }

            const id = data[0].id
            
            return id
        }
        catch (err) {
            throw err
        }
    }

}
