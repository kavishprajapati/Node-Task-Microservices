module.exports = function makeCreateEmployee ({ axios }){
    return async function createEmployee({ companyId }){

        try{
            const employeeCreated = axios.post('http://localhost:9092/Employee', {
                cmpId: companyId,
                empName: "kahan",
                contact: 8989898989,
                role: "admin"
            })
        }
        catch(err){
            throw err
        }
    }
}