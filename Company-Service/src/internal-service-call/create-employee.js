module.exports = function makeInternalCallCreateEmployee ({ axios }){
    return async function internalCallCreateEmployee({ companyid }){

        try{
            const employeeCreated = axios.post('http://localhost:9092/Employee', {
                cmpId: companyid,
                empName: "kahan",
                contact: 8989898989,
                role: "admin"
            })
        }
        catch(err){
            // console.log(err);
            throw err
        }
    }
}