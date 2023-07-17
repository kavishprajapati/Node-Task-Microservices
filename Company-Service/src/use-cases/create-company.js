module.exports = function makeCreateCompany({ companyData, Joi, internalCallCreateEmployee }) {
    return async function createCompany({ name, city, address, contact }) {

        try {
            const validatedData = validation({ name, city, address, contact });
            const companydata =  await companyData({ name: validatedData.name, city: validatedData.city, address: validatedData.address, contact: validatedData.contact })
            const companyid = companydata.id

            await internalCallCreateEmployee({ companyid })

        }
        catch (err) {
            throw err;
        }
    }
    function validation({ name, city, address, contact }) {

        const { error, value } = Joi.object({
            name: Joi.string().min(3).max(20).required(),
            city: Joi.string().min(5).max(20).required(),
            address: Joi.string().min(5).max(100).required(),
            contact: Joi.number().integer().min(1000000000).max(9999999999).required()
        }).validate({ name, city, address, contact });

        if (error) {
            throw new error.details[0].message;
        }
        else {
            return value;
        }
    }
}
