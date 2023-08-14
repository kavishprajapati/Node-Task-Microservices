module.exports = function makeGetAllEmployeeAction({ getAllEmployee }){

    return async function getAllEmployeeAction(req, res){
        try{
            const employeeData = await getAllEmployee()
            
            res.status(200).json({
                status: "Success",
                data: { employeeData: employeeData }
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

