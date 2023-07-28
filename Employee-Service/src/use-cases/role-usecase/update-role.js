module.exports = function makeUpdateRole({ EmployeeTable, Joi }) {
    return async function updateRole({ roleName, permission, id }) {
        try {
            const validatedData = await validateData({ roleName, permission, id });
            await EmployeeTable.updateRole({ roleName: validatedData.roleName, permission: validatedData.permission, id: validatedData.id })

            return "Role is updated";
        } 
        catch (err) {
            throw err.message
        }
    };

    function validateData({ roleName, permission, id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required(),
            roleName: Joi.string().min(2).max(20).required(),
            permission: Joi.object().required()
        }).validate({ roleName, permission, id });

        if (error) {
            throw error.details[0]
        } 
        
        return value;
    }
}

