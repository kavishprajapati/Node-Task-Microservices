module.exports = function makeGetAllEmployee({ EmployeeData }){
    return async function getAllEmployee(){

        try{
            const allEmployeeData = await EmployeeData();
            return allEmployeeData
        }
        catch(err){
            throw err
        }

    }
}