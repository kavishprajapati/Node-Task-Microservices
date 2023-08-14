module.exports = function makeCreateEmployee({ axios, config }) {
    return async function createEmployee({ companyId }) {
        try {
            const employeeCreated = await axios({
                method: 'post',
                url: `${config.serviceEndpoints.Employee}`,
                data: {
                    cmpId: companyId,
                    empName: "savan",
                    contact: 7878787879,
                    role: "admin"   
                }
            });

        } catch (err) {
            throw err 
        }
    };
};
