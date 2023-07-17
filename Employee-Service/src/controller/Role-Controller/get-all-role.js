module.exports = function makeGetAllRoleDetailsAction({ getAllRoleDetails }) {
    return async function getAllRoleDetailsAction(req, res){

        try{
            const roleData = await getAllRoleDetails();
            res.status(200).json({
                status: "Success",
                data: { roleData }
            })
        }
        catch(err){
            res.status(404).json({
                status: "fail",
                error: err
            })
        }
    }
}

