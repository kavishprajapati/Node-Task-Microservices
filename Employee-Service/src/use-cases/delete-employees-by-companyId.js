module.exports = function makeDeleteEmployeesByCompanyId({ EmployeeTable, Joi }){
    return async function deleteEmployeesByCompanyId({ companyId }){

        try{
            const validatedId = validateData ({ companyId });
            let result = await EmployeeTable.deleteEmployeesByCompanyId( {companyId: validatedId.companyId} ) 
        
            return result;
        }
        catch(err){
            throw err.message
        }
    }

    function validateData({ companyId }){
        const { error, value } = Joi.object({
            companyId: Joi.string().uuid().required()
        }).validate({companyId})

        if (error){
            throw error.details[0]
        }
    
        return value 
    }
}
