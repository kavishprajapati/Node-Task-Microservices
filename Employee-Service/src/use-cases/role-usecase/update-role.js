module.exports = function makeUpdateRole({ EmployeeData, Joi }) {
    return async function updateRole({ roleName, permission, id }) {
        try {
            const validatedData = await validation({ roleName, permission, id });
            await EmployeeData({ roleName: validatedData.roleName, permission: validatedData.permission, id: validatedData.id })
        } 
        catch (err) {
            throw err;
        }
    };

    function validation({ roleName, permission, id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required(),
            roleName: Joi.string().min(2).max(20).required(),
            permission: Joi.object().required()
        }).validate({ roleName, permission, id });

        if (error) {
            throw new Error(error.details[0].message);
        } else {
            return value;
        }
    }

}

