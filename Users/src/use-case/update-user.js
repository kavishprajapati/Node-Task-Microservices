module.exports = function makeUpdateUser({ userTable, Joi }){
    return async function updateUser({ updateUserData, id }){

        try{
            const validatedData = validateData({ updateUserData, id })
            await userTable.updateUser({ ...validatedData, id })
        }
        catch(err){
            throw err
        }

    }

    function validateData({ updateUserData, id }) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            updateUserData: Joi.object({
                username: Joi.string().min(3).max(20),
                useremail: Joi.string().email(),
                password: Joi.string()
                    .pattern(passwordRegex, 'password')
                    .messages({
                        'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
                      })
            })
        })

        const { error, value } = schema.validate({ updateUserData, id });

        if (error) {
            throw new Error(error.details[0].message);
        }
            
        return value;
    }
}




      