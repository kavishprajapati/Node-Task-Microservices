module.exports = function makeGetRoleDataById({ EmployeeData, Joi }) {
    return async function getRoleDataById({ id }) {

        try {
            const validatedId = await validation({ id })
            const roleData = await EmployeeData({ id: validatedId.id })
            return roleData
        }

        catch (err) {
            throw err
        }

    }

    function validation({ id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id });
        if (error) {
            throw new Error(error.details[0].message);
        }
            return value;
        
    }
}
