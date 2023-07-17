module.exports = function makeCreateUser({ userData, Joi }){
    return async function createUser({ username, useremail, password }){

        try{
            const validatedData = validation({ username, useremail, password })
            const userdata = await userData({ username: validatedData.username, useremail: validatedData.useremail, password: validatedData.password })
        }
        catch(err){
            throw err
        }

    } 

    function validation({ username, useremail, password }) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
        const schema = Joi.object({
          username: Joi.string().required(),
          useremail: Joi.string().email().required(),
          password: Joi.string()
            .pattern(passwordRegex, 'password')
            .required()
            .messages({
              'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
            })
        });
      
        const { error, value } = schema.validate({ username, useremail, password });
        if (error) {
          throw new Error(error.details[0].message);
        }
      
        return value;
        
      }          
 
}

