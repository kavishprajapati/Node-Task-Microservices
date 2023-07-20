module.exports = function makeDeleteEmployeesByCompanyId({ EmployeeTable, Joi }){
    return async function deleteEmployeesByCompanyId({companyId}){

        try{
            const validatedId = validateData ({ companyId });
            await EmployeeTable.deleteEmployeesByCompanyId( {id: validatedId.companyId} ) 
        }
        catch(err){
            throw err
        }
    }

    function validateData({ companyId }){
        const { error, value } = Joi.object({
            companyId: Joi.string().uuid().required()
        }).validate({companyId})

        if (error){
            throw new error.details[0].message;
        }
    
        return value 
    }
}