module.exports = function makeAssignRole({ EmployeeTable, Joi }){
    return async function assignRole({ roleid, employeeid }){

        try{

            const validatedId = validateData({ roleid, employeeid })
            await EmployeeTable.assignRole({ roleid: validatedId.roleid, employeeid: validatedId.employeeid })
            
            return "Role is assigned Successfully to an employee"; //this is am using for test-cases
        }
        catch(err){
            throw err.message
        }
    }

    function validateData({ roleid, employeeid }) {
        const { error, value } = Joi.object({
            roleid: Joi.string().uuid().required(),
            employeeid: Joi.string().uuid().required()
        }).validate({ roleid, employeeid });
        if (error) {
            throw error.details[0]
        }
        
        return value; 
    }
}
