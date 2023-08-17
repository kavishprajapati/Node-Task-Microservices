module.exports = function makeCreateEmployeeAction({ createEmployee }){
    return async function createEmployeeAction(req, res){

        try{
            const { cmpId, companyName, empName, contact, role } = req.body;
            // console.log( cmpId, companyName, empName, contact, role );
            const newEmployee = await createEmployee ({ cmpId ,companyName, empName, contact, role })
            console.log(newEmployee);

            res.status(201).json({
                status: "Success",
                data: { employeeId: newEmployee }
            })
        }

        catch(err){
            res.status(400).json({
                status: "Fail", 
                data: { Error: err }
            })
        }   
    }
}