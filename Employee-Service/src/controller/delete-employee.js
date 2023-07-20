module.exports = function makeDeleteEmployeeAction({ deleteEmployee }){
    return async function deleteEmployeeAction(req, res){

        try{
            const id = req.params.id
            await deleteEmployee({ id })
            res.status(204).json({
                status: "success",
                data: "Employee Deleted"
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                data: "Fail to delete employee"
            })
        }

    }
}