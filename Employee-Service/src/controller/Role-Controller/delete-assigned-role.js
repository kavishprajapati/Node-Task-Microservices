module.exports = function makeDeleteAssignedRoleAction({ deleteAssignedRole }){
    return async function deleteAssignedRoleAction(req, res){

        try{
            const id = req.params.id
            await deleteAssignedRole({ id })
            
            res.status(204).json({
                status: "Success",
                data: { message: "Assigned Role Deleted Successfuly" }
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                data: { error: err }
            })
        }
    }
}
