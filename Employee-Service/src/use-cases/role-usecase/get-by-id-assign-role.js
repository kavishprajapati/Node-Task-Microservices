module.exports = function makeGetByIdAssignedRole({ EmployeeTable, Joi }){
    return async function getByIdAssignedRole({ id }){

        try{
            
            const validatedId = await validateData({ id })
            return await EmployeeTable.getByIdAssignedRole({ id: validatedId.id })

        }
        catch(err){
            throw err
        }
         
    }

    function validateData({ id }){
        const{ error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id })
        if (error){
            throw new Error(error.details[0].message)
        }

        return value;
    }
}
