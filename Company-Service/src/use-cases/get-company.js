module.exports = function makeGetCompany({ companyData, Joi }) {
    return async function getCompany({ id }) {
        try {
            const validatedId = validation({ id })
            const Data = await companyData({ id: validatedId.id })
            return Data
        }
        catch (err) {
            throw err
        }
    }

    function validation({ id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id });

        if (error) {
            throw new error.details[0].message;
        }
        else {
            return value;

        }
    }
}




