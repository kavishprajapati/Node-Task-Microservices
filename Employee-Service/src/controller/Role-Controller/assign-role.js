module.exports = function makeAssignRoleAction({ assignRole }){
    return async function assignRoleAction(req, res){
        try{
            const  { roleid, employeeid } = req.body
            const roleAssigned = await assignRole({ roleid, employeeid })

            res.status(200).json({
                status: "success",
                data: "Role assigned to an Employee"
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
