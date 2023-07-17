module.exports = function makeUpdateRoleAction({ updateRole }){
    return async function updateRoleAction(req, res){

        try{
            const id = req.params.id
            const { roleName, permission } = req.body
            await updateRole({ roleName, permission, id })
            res.status(201).json({
                status: "Success",
                data: "Role updated"
            })
        }
        catch(err){
            res.status(404).json({
                status: "fail",
                data: "fail to update data"
            })
        }

    }
}
