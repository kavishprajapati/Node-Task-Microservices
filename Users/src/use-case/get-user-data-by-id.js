module.exports = function makeGetUserDataById({ userTable, Joi }) {
    return async function getUserDataById({ id }) {

        try {
            const validatedId = validateData({ id })
            const result =  await userTable.getUserDataById({ id: validatedId.id })
           
            if(!result){
                throw new Error("User Data Not Found")
            }

            return result
        }
        catch (err) {
            throw err.message
        }
    }

    function validateData({ id }) {
        const schema = Joi.object({
            id: Joi.string().uuid().required()
        })

        const { error, value } = schema.validate({ id })

        if (error) {
            throw error.details[0]
        }

        return value;
    }
}
