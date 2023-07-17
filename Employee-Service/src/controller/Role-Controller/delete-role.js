module.exports = function makeDeleteRoleAction({ deleteRole }){
    return async function deleteRoleAction(req, res){

        try{
            const id = req.params.id
            await deleteRole({ id })
            res.status(200).json({
                status: "success",
                data: "Role Deleted Successfully"
            })
        }
        catch(err){
            res.status(400).json({
                status: "fail",
                data: "fail to delete role"
            })
        }
    }
}


