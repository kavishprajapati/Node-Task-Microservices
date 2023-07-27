module.exports = function makeUpdateRoleAction({ updateRole }){
    return async function updateRoleAction(req, res){

        try{
            const id = req.params.id
            const { roleName, permission } = req.body
            console.log(permission);
            await updateRole({ roleName, permission, id })
            res.status(200).json({
                status: "Success",
                data: "Role updated"
            })
        }
        catch(err){
            res.status(400).json({
                status: "fail",
                data: err
            })
        }

    }
}
