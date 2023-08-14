module.exports = function makeUpdateRoleAction({ updateRole }){
    return async function updateRoleAction(req, res){

        try{
            const id = req.params.id
            const { roleName, permission } = req.body
            await updateRole({ roleName, permission, id })

            res.status(200).json({
                status: "Success",
                data: { message: "Role updated" }
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
