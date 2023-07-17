module.exports = function makeGetAssignedRole({ EmployeeData }){
    return async function getAssignedRole(){

        try{
            const getAllAssignedRoleDetails = await EmployeeData();
            return getAllAssignedRoleDetails
        }
        catch(err){
            throw err
        }

    }
}

