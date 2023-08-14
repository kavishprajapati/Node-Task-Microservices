module.exports = function makeDeleteUser({ userTable, Joi }){
    return async function deleteUser({ id }){

        try{
            const validatedId = validateData({ id })
            const result = await userTable.deleteUser({ id: validatedId.id })

            return result;
        }
        
        catch(err){
            throw err.message
        }

    }


    function validateData({ id }){
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