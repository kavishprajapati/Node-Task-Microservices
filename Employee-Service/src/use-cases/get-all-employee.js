module.exports = function makeGetAllEmployee({ EmployeeTable }){
    return async function getAllEmployee(){

        try{
            return await EmployeeTable.getAllEmployee();
        }
        catch(err){
            throw err
        }

    }
}