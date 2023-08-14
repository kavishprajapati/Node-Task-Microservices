module.exports = function makeGetAssignedRole({ EmployeeTable }){
    return async function getAssignedRole(){

        try{
            return await EmployeeTable.getAssignedRole();
        }

        catch(err){
            throw err
        }
    }
}