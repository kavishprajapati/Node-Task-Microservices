module.exports = function makeAssignRole({ EmployeeData, Joi }){
    return async function assignRole({ roleid, employeeid }){

        try{

            const validatedId = await validation({ roleid, employeeid })
            const employeeData =  await EmployeeData({ roleid: validatedId.roleid, employeeid: validatedId.employeeid })
            
        }
        catch(err){
            throw err
        }
    }

    function validation({ roleid, employeeid }) {
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
