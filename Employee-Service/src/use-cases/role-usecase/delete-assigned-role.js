module.exports = function makedeleteAssignedRole({ EmployeeData, Joi }){
    return async function deleteAssignedRole({ id }){
        
        try{
            const validatedId = validation({ id })
            await EmployeeData({ id: validatedId.id })
        }
        catch(err){
            throw err
        }

    }

    function validation({ id }){
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({id})

        if (error){
            throw new error.details[0].message;
        }
        else{
            return value
        }
    }
    
}









