module.exports = function makedeleteAssignedRole({ EmployeeTable, Joi }){
    return async function deleteAssignedRole({ id }){
        
        try{
            const validatedId = validateData({ id })
            await EmployeeTable.deleteAssignedrole({ id: validatedId.id })
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









