module.exports = function makeGetRoleDataByIdAction( {getRoleDataById} ){
    return async function getRoleDataIdAction(req, res){
        try{
            const id = req.params.id
            const roleData = await getRoleDataById({ id })

            res.status(200).json({
                status: "Success",
                data: { roleData: roleData }
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

