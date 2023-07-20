module.exports = function makeAssignRole({ EmployeeTable, Joi }){
    return async function assignRole({ roleid, employeeid }){

        try{

            const validatedId = await validateData({ roleid, employeeid })
            const employeeData =  await EmployeeTable.assignRole({ roleid: validatedId.roleid, employeeid: validatedId.employeeid })
            
        }
        catch(err){
            throw err
        }
    }

    function validateData({ roleid, employeeid }) {
        const { error, value } = Joi.object({
            roleid: Joi.string().uuid().required(),
            employeeid: Joi.string().uuid().required()
        }).validate({ roleid, employeeid });
        if (error) {
            throw new Error(error.details[0].message);
        }
        
        return value; 
    }
}
