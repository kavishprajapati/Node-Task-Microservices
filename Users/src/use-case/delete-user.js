module.exports = function makeDeleteUser({ userTable, Joi }){
    return async function deleteUser({ id }){

        try{
            const validatedId = validateData({ id })
            await userTable.deleteUser({ id: validatedId.id })
        }
        catch(err){
            throw err
        }

    }


    function validateData({ id }){
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