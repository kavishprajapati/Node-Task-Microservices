module.exports = function makeCreateRoleAction({ createRole }){
    return async function createRoleAction(req, res){

        try{
            const companyid = req.params.id
            const {roleName, permission} = req.body
            const newRole = await createRole({ roleName, companyid ,permission })
            
            res.status(201).json({
                status: "Success",
                data: "New Role Is Created"
            })
        }
        catch(err){
            console.log(err);
            res.status(400).json({
                status: "fail",
                data: "Not able to create new role"
            })
        }

    }
}

