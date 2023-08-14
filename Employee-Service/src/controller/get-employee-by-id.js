module.exports = function makeGetEmployeeDataByIdAction({ getEmployeeDataById }){
    return async function getEmployeeDataByIdAction(req, res){
        
        try{
            const id = req.params.id
            const employeeData =  await getEmployeeDataById({ id })

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

