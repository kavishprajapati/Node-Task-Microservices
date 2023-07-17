module.exports = function makeGetRoleDataByIdAction( {getRoleDataById} ){
    return async function getRoleDataIdAction(req, res){
        try{
            const id = req.params.id
            const roleData = await getRoleDataById({ id })

            res.status(200).json({
                status: "Success",
                data: {
                    roleData
                }
            })
        }
        catch(err){
            res.status(404).json({
                status: "fail",
                data: "fail to get a data"
            })
        }
    }
}

