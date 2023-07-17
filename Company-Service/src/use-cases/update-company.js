module.exports = function makeUpdateCompany({ companyData, Joi }) {
    return async function updateCompany({ updateData, id }) {

        try {
            const validatedData = await validation({ updateData, id })
            await companyData({ ...validatedData, id })
        }
        catch (err) {
            throw err;
        }
    }
    function validation({ updateData, id }) {

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
        else {
            return value;
        }
    }
}
