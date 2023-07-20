module.exports = function makeGetRoleDataById({ EmployeeTable, Joi }) {
    return async function getRoleDataById({ id }) {

        try {
            const validatedId = await validateData({ id })
            return await EmployeeTable.getRoleDataById({ id: validatedId.id })
        }

        catch (err) {
            throw err
        }

    }

    function validateData({ id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id });
        if (error) {
            throw new Error(error.details[0].message);
        }

        return value;
    }
}
