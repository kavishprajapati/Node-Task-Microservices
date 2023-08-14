module.exports = function makeDeleteRoleAction({ deleteRole }){
    return async function deleteRoleAction(req, res){

        try{
            const id = req.params.id
            await deleteRole({ id })
            res.status(204).json({
                status: "Success",
                data: { message: "Role Deleted Successfully" }
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                data:{ error: err }
            })
        }
    }
}


