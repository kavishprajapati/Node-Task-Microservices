module.exports = function makeDeleteCompany({companyData, Joi, producer}){
    return async function deleteCompany({id}){

        try{
            const validatedId = validation({ id });
            await companyData({ id: validatedId.id })

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

            //Disconnect the kafka producer
            // await producer.disconnect();
        }
        catch(err){
            throw err
        }
    }

    function validation({id}){
        const { error, value } = Joi.object({
            id: Joi.string().uuid().required()
        }).validate({id});

        if (error) {
            throw new error.details[0].message;
        }
        else {
            return value;
        }

    }
}