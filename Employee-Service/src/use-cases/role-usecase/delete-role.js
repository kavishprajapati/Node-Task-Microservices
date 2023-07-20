module.exports = function makeDeleteRole({ EmployeeTable, Joi }){
    return async function deleteRole({ id }){

        try{
            const validatedId = validateData({ id })
            await EmployeeTable.deleteRole({ id: validatedId.id })
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



