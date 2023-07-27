module.exports = function makeCreateEmployeeAction({ createEmployee }){
    return async function createEmployeeAction(req, res){

        try{
            const { cmpId, companyName, empName, contact, role } = req.body;
            const newEmployee = await createEmployee ({ cmpId ,companyName, empName, contact, role})
            console.log(newEmployee);
            res.status(201).json({
                status: "New Employee Created Successfully",
                data: newEmployee
            })
        }
        catch(err){
            console.log(err);
            res.status(400).json({
                status: "Error", 
                data: err
            })
        }
        
    }
}