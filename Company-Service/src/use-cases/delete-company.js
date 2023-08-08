module.exports = function makeDeleteCompany({companyTable, Joi, producer}){
    return async function deleteCompany({id}){

        try{
            const validatedId = validateData({ id });
            await companyTable.deleteCompany({ id: validatedId.id })

            //Publish "CompanyDeleted" event
            await producer.connect();
            await producer.send({
                topic: "company-events",
                messages: [
                    {
                        key: null,
                        value: JSON.stringify({ eventType: "CompanyDeleted", companyId: validatedId.id }),
                    }
                ]
            })

            return { message: "Company deleted successfully" } //this is i have written because i am using this message in test-cases. //this is not for controller file.
        }
        catch(err){
            throw err.message;
        }
    }

    function validateData({id}){
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({id});

        if (error) {
            throw error.details[0]
        }
        
        return value;
        
    }
}