module.exports = function makeUpdateEmployeeAction ({ updateEmployee }) {
    return async function updateEmployeeAction(req, res){

        try{
            const id = req.params.id;
            const updateData = req.body;
            await updateEmployee( updateData, id )
            res.status(201).json({
                status: "Success",
                data: "Employee Data Updated Successfully"
            })
        }
        catch(err){
            res.status(404).json({
                status: "Fail",
                data: "Fail to update employee data"
            })
        }

    }
}

