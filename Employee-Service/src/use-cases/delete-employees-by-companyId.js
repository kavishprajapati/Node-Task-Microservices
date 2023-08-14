module.exports = function makeDeleteEmployeesByCompanyId({ EmployeeTable, Joi }){
    return async function deleteEmployeesByCompanyId({ companyId }){

        try{
            const validatedId = validateData ({ companyId });
            await EmployeeTable.deleteEmployeesByCompanyId( {companyId: validatedId.companyId} ) 
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
