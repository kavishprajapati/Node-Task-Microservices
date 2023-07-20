module.exports = function makeUpdateCompany({ companyTable, Joi }) {
    return async function updateCompany({ updateData, id }) {

        try {
            const validatedData = await validateData({ updateData, id })
            await companyTable.updateCompany({ ...validatedData, id })
        }
        catch (err) {
            throw err;
        }
    }

    function validateData({ updateData, id }) {

        const { error, value } = Joi.object({
            id: Joi.string().uuid().required(),
            updateData: Joi.object({
                name: Joi.string().min(3).max(20),
                city: Joi.string().min(5).max(20),
                address: Joi.string().min(5).max(100),
                contact: Joi.number().integer().min(1000000000).max(9999999999)
            })
        }).validate({ updateData, id });

        if (error) {

            throw new error.details[0].message;
        }
        
         return value;    
    }
}
