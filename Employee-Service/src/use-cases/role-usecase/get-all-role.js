module.exports = function makeGetAllRoleDetails({ EmployeeData }){
    return async function getAllRoleDetails() {

        try{
            const allRoleDetails = await EmployeeData();
            return allRoleDetails
        }
        catch(err){
            throw err
        }

    }
}
