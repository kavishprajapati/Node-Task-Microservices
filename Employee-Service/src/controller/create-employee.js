module.exports = function makeCreateEmployeeAction({ createEmployee }){
    return async function createEmployeeAction(req, res){

        try{
            const { cmpId,companyName, empName, contact, role } = req.body;
            const newEmployee = await createEmployee ({ cmpId ,companyName, empName, contact, role})
            res.status(200).json({
                status: "New Employee Created Successfully",
                data: newEmployee
            })
        }
        catch(err){
            res.status(404).json({
                status: "Error", 
                data: err
            })
        }
        
    }
}