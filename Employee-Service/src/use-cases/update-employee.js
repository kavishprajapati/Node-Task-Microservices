module.exports = function makeUpdateEmployee({ EmployeeTable, Joi }) {
    return async function updateemployee(updateData, id) {

        try {
            const validatedData = await validateData({ updateData, id })
            await EmployeeTable.updateEmployee({ ...validatedData, id })
        }
        catch (err) {
            throw err;
        }
    }

    function validateData({ updateData, id }) {

        const { error, value } = Joi.object({
            id: Joi.string().uuid().required(),
            updateData: Joi.object({
                empname: Joi.string().min(3).max(20),
                contact: Joi.number().integer().min(1000000000).max(9999999999)
            })
        }).validate({ updateData, id })

        if (error) {
            throw new error.details[0].message;
        }
        
        return value;
    }
}
