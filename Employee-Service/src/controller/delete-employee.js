module.exports = function makeDeleteEmployeeAction({ deleteEmployee }){
    return async function deleteEmployeeAction(req, res){

        try{
            const id = req.params.id
            await deleteEmployee({ id })
            res.status(204).json({
                status: "Success",
                data: { message: "Employee Deleted" }
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