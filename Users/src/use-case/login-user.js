module.exports = function makeUserLogin({ userTable, Joi, bcrypt, jwt, sendMail }) {
    return async function userLogin({ username, password }) {
        try {

            const validatedData = await validateData({ username, password })

            const userExit = await userTable.getUserByName({ username: validatedData.username });

            if (userExit.length === 0) {
                // User does not exist in the database
                console.log("User does not exist in the database");
                return;
            }

            const user = userExit[0];
            const passwordMatch = await bcrypt.compare(validatedData.password, user.password);

            const userId = user.userid // I am passing this in storeJWTTokken function.

            if (passwordMatch) {
                // Passwords match, user is authenticated
                console.log("User authenticated");

                const token = jwt.sign({ userid: userId }, 'kavish-token', { expiresIn: '24h' });
                await userTable.storeUserjwtToken({ userId, token })
                console.log("Token stored");
                await sendMail()
                console.log("Mail sent successfully");
            } else {
                // Passwords do not match, user authentication failed
                console.log("User authentication failed");
            }


        } catch (err) {
            throw err;
        }
    }


    function validateData({ username, password }) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const schema = Joi.object({
            username: Joi.string(),
            password: Joi.string()
                .pattern(passwordRegex, 'password')
                .required()
                .messages({
                    'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
                })
        });

        const { error, value } = schema.validate({ username, password });
        if (error) {
            throw new Error(error.details[0].message);
        }

        return value;

    }

}
