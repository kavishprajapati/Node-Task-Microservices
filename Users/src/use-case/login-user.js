module.exports = function makeUserLogin({ userTable, Joi, bcrypt, jwt, sendMail }) {
    return async function userLogin({ username, password }) {
        try {

            const validatedData = await validateData({ username, password })
            
            const userExit = await userTable.getUserByName({ username: validatedData.username });

            if ( !userExit ) {
                // User does not exist in the database
                throw new Error("User does not exist in the database")

            }
            
            const user = userExit[0];
            const passwordMatch = await bcrypt.compare(validatedData.password, user.password);

            const userId = user.userid // I am passing this in storeJWTTokken function.

            if (passwordMatch) {
                // Passwords match, user is authenticated
                const token = jwt.sign({ userid: userId }, 'kavish-token', { expiresIn: '24h' });
                await userTable.storeUserjwtToken({ userId, token })

                await sendMail()

            }
            else{
                throw new Error("Password Not Matched")
            }


        } catch (err) {

            throw err.message
        }
    }


    function validateData({ username, password }) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
                .pattern(passwordRegex, 'password')
                .messages({
                    'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
                })
        });

        const { error, value } = schema.validate({ username, password });
        if (error) {
            throw error.details[0]
        }

        return value;

    }

}