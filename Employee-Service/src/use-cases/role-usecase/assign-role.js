module.exports = function makeAssignRole({ EmployeeTable, Joi }){
    return async function assignRole({ roleid, employeeid }){

        try{

            const validatedId = validateData({ roleid, employeeid })
            let result = await EmployeeTable.assignRole({ roleid: validatedId.roleid, employeeid: validatedId.employeeid })
            
            return result //this is am using for test-cases
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
