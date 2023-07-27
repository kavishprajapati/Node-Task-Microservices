module.exports = function makeGetCompany({ companyTable, Joi }) {
    return async function getCompany({ id }) {
        try {
            const validatedId = validateData({ id })
            const companyData =  await companyTable.getCompanyData({ id: validatedId.id })

            if(!companyData){
                throw new Error("No data is present with this id")
            }

            return companyData

        }
        catch (err) {
            throw err.message
        }
    }

    function validateData({ id }) {
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({ id });

        if (error) {
            throw error.details[0];
        }
       
        return value;
    }
}




