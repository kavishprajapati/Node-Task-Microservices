module.exports = function makeGetRoleDataById({ EmployeeTable, Joi }) {
    return async function getRoleDataById({ id }) {

        try {
            const validatedId = await validateData({ id })
            return await EmployeeTable.getRoleDataById({ id: validatedId.id })
        }

        catch (err) {
            throw err.message
        }

    }

    function validateData({ id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id });
        if (error) {
            throw error.details[0]
        }

        return value;
    }
}