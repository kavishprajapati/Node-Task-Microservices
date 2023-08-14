module.exports = function makeCreateCompany({ companyTable, Joi, createEmployee }) {
    return async function createCompany({ name, city, address, contact }) {

        try {
        
            const validatedData = validateData({ name, city, address, contact });
        
            const companyId =  await companyTable.createCompany({ name: validatedData.name, city: validatedData.city, address: validatedData.address, contact: validatedData.contact })
            
            if(!companyId){
                throw new Error("Not able to fetch company Id")
            }
            
            await createEmployee({ companyId })
            
        }
        catch (err){
            throw err.message;
        }
    }

    function validateData({ name, city, address, contact }) {
        const { error, value } = Joi.object({
            name: Joi.string().min(3).max(20).required(),
            city: Joi.string().min(5).max(20).required(),
            address: Joi.string().min(5).max(100).required(),
            contact: Joi.number().integer().min(1000000000).max(9999999999).required()
        }).validate({ name, city, address, contact });

        if (error) {
            throw error.details[0];
        }
        return value;      
    }
}


