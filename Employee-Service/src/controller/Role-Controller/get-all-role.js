module.exports = function makeGetAllRoleDetailsAction({ getAllRoleDetails }) {
    return async function getAllRoleDetailsAction(req, res){

        try{
            const roleData = await getAllRoleDetails();
            res.status(200).json({
                status: "Success",
                data: { roleData: roleData }
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                error: { error: err }
            })
        }
    }
}

