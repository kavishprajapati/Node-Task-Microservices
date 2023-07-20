module.exports = function makeGetAllRoleDetails({ EmployeeTable }){
    return async function getAllRoleDetails() {

        try{
            return await EmployeeTable.getAllRoleDetails();
        }
        catch(err){
            throw err
        }

    }
}
