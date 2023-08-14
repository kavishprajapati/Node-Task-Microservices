module.exports = function makeDeleteRole({ EmployeeTable, Joi }){
    return async function deleteRole({ id }){

        try{
            const validatedId = validateData({ id })
            let result =  await EmployeeTable.deleteRole({ id: validatedId.id })
        
            return result;
        }
        catch(err){
            throw err.message
        }

    }
    
    function validateData({ id }){
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({id})

        if (error){
            throw error.details[0]
        }

        return value
    }
}


