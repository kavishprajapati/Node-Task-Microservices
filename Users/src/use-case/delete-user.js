module.exports = function makeDeleteUser({ userData, Joi }){
    return async function deleteUser({ id }){

        try{
            const validatedId = validation({ id })
            await userData({ id: validatedId.id })
        }
        catch(err){
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