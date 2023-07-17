module.exports = function makeUpdateEmployee({ EmployeeData, Joi }) {
    return async function updateemployee(updateData, id) {

        try {
            const validatedData = await validation({ updateData, id })
            await EmployeeData({ ...validatedData, id })
        }
        catch (err) {
            throw err;
        }
    }

    function validation({ updateData, id }) {

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
        else {
            return value;
        }

    }
}
