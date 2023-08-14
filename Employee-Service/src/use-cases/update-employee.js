module.exports = function makeUpdateEmployee({ EmployeeTable, Joi }) {
    return async function updateemployee({updateData, id}) {

        try {    

            if( Object.keys(updateData).length === 0 ){
                throw new Error("Update data cannot be empty");
            }

            const validatedData = await validateData({ updateData, id })
            let result = await EmployeeTable.updateEmployee({ ...validatedData, id })

            return result; // this line giving return value to testcase, i have written this line which i have used to pass a test-case.
        }
        catch (err) {
            throw err.message
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
            throw error.details[0]
        }
        
        return value;
    }
}
