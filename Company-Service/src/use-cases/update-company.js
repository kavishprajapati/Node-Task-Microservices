module.exports = function makeUpdateCompany({ companyTable, Joi }) {
    return async function updateCompany({ updateData, id }) {

        try {
            if( Object.keys(updateData).length === 0 ){
                throw new Error("Update data cannot be empty");
            }

            const validatedData = await validateData({ updateData, id })
            await companyTable.updateCompany({ ...validatedData, id })

            return "Company data updated successfully"; // this line giving return value to testcase, i have written this line which i have used to pass a test-case.
        }
        catch (err) {
            throw err.message;
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

            throw error.details[0]
        }
        
         return value;    
    }
}
