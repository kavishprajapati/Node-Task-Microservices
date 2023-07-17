module.exports = function makeDeleteEmployeesByCompanyId({ EmployeeData, Joi }){
    return async function deleteEmployeesByCompanyId({companyId}){

        try{
            const validatedId = validation ({ companyId });
            await EmployeeData( {id: validatedId.companyId} ) 
        }
        catch(err){
            throw err
        }
    }

    function validation({ companyId }){
        const { error, value } = Joi.object({
            companyId: Joi.string().uuid().required()
        }).validate({companyId})

        if (error){
            throw new error.details[0].message;
        }
        else{
            return value
        }
    }

}