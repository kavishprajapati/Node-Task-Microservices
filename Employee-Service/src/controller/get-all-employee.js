module.exports = function makeGetAllEmployeeAction({ getAllEmployee }){

    return async function getAllEmployeeAction(req, res){
        try{
            const employeeData = await getAllEmployee();
            res.status(200).json({
                status: "success",
                data: { employeeData }
            })
        }
        catch(err){
            res.status(404).json({
                status: "fail",
                error: err
            })
        }
    }

}
