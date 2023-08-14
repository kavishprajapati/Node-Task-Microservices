module.exports = function makeAssignRoleAction({ assignRole }){
    return async function assignRoleAction(req, res){
        try{
            const  { roleid, employeeid } = req.body
            const roleAssigned = await assignRole({ roleid, employeeid })

            res.status(200).json({
                status: "Success",
                data: { message: "Role assigned to an Employee" }
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                data: { error: err}
            })
        }
    }
}
