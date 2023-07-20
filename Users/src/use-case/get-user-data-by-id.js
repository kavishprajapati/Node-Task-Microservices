module.exports = function makeGetUserDataById({ userTable, Joi }) {
    return async function getUserDataById({ id }) {

        try {
            const validatedId = validateData({ id })
            return await userTable.getUserDataById({ id: validatedId.id })
        }
        catch (err) {
            throw err
        }

    }

    function validateData({ id }) {
        const schema = Joi.object({
            id: Joi.string().uuid().required()
        })

        const { error, value } = schema.validate({ id })

        if (error) {
            throw new Error(error.details[0].message);
        }

        return value;
    }
}
