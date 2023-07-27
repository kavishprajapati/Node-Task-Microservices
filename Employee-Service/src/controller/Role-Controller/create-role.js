module.exports = function makeCreateRoleAction({ createRole }){
    return async function createRoleAction(req, res){

        try{
            const companyid = req.params.id
            const {roleName, permission} = req.body
            await createRole({ roleName, companyid ,permission })
            
            res.status(201).json({
                status: "Success",
                data: "New Role Is Created"
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
