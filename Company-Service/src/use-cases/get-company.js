module.exports = function makeGetCompany({ companyTable, Joi }) {
    return async function getCompany({ id }) {
        try {
            const validatedId = validateData({ id })
            return await companyTable.getCompanyData({ id: validatedId.id })
        }
        catch (err) {
            throw err
        }
    }

    function validateData({ id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id });

        if (error) {
            throw new error.details[0].message;
        }
       
        return value;
       
    }
}




