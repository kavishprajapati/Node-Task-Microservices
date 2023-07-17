module.exports = function makeGetByIdAssignedRole({ EmployeeData, Joi }){
    return async function getByIdAssignedRole({ id }){

        try{
            
            const validatedId = await validation({ id })
            const assignedRole = await EmployeeData({ id: validatedId.id })
            return assignedRole

        }
        catch(err){
            throw err
        }
         
    }

    function validation({ id }){
        const{ error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id })
        if (error){
            throw new Error(error.details[0].message)
        }

        return value;

    }

}
