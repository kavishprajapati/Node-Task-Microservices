module.exports = function makeGetByIdAssignedRole({ EmployeeTable, Joi }){
    return async function getByIdAssignedRole({ id }){

        try{
            
            const validatedId = await validateData({ id })
            return await EmployeeTable.getByIdAssignedRole({ id: validatedId.id })

        }
        catch(err){
            throw err.message
        }   
    }

    function validateData({ id }){
        const{ error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id })
        if (error){
            throw error.details[0]
        }

        return value;
    }
}
