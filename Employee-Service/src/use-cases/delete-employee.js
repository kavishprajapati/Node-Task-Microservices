module.exports = function makeDeleteEmployee({ EmployeeTable, Joi }){
    return async function deleteEmployee({id}){

        try{
            const validatedId = validateData ({ id });
            await EmployeeTable.deleteEmployee( {id: validatedId.id} ) 
        }
        catch(err){
            throw err
        }
    }

    function validateData({ id }){
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({id})

        if (error){
            throw new error.details[0].message;
        }
       
        return value 
    }

}