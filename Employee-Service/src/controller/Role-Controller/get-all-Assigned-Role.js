module.exports = function makeGetAssignedRoleAction({ getAssignedRole }){
    return async function getAssignedRoleAction(req, res){

        try{
            const roleData = await getAssignedRole();
            res.status(200).json({
                status: "Success",
                data: { roleData }
            })
        }
        catch(err){
            res.status(400).json({
                status: "fail",
                error: err
            })
        }

    }
}
