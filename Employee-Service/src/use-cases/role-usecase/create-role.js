module.exports = function makeCreateRole({ EmployeeTable, Joi }){
    return async function createRole({ roleName, companyid, permission }){

        try{
            const validatedData = validateData({ roleName, companyid, permission });
            const employeeData = await EmployeeTable.createRole({ roleName: validatedData.roleName, companyid: validatedData.companyid, permission: validatedData.permission })
            console.log(employeeData);
            return employeeData
        }
        catch(err){
            throw err
        }
    }

    function validateData({ roleName, companyid, permission }) {

        const {error, value} = Joi.object({
            roleName: Joi.string().min(2).max(20).required(),
            companyid: Joi.string().uuid().required(),
            permission: Joi.object().required().unknown(true)
        }).validate({ roleName, companyid, permission });


        if (error) {
            throw new error.details[0].message;
        }
    
        return value;
    }
}


