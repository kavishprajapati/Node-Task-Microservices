module.exports = function makeGetUserDataById({ userData, Joi }){
    return async function getUserDataById({ id }){

        try {
            const validatedId = validation({ id })
            const data = await userData({ id: validatedId.id })
            return data
        } 
        catch (err) {
            throw err
        }

    }

    function validation({ id }){
        const schema = Joi.object({
            id: Joi.string().uuid().required()
        })  

        const { error, value } = schema.validate({ id })

        if (error) {
            throw new Error(error.details[0].message);
          } else {
            return value;
          }
    }

}
