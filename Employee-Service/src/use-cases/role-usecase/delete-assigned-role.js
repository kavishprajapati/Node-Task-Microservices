module.exports = function makedeleteAssignedRole({ EmployeeTable, Joi }){
    return async function deleteAssignedRole({ id }){
        
        try{
            const validatedId = validateData({ id })
            await EmployeeTable.deleteAssignedrole({ id: validatedId.id })
        
            return "assigned role deleted successfully"; //this is used in test-cases
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









