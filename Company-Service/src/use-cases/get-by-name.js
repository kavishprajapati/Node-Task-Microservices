module.exports = function makeGetDataByName({ companyData, Joi }){
    return async function getDataByName({cmpname}){
        try{
            const validatedName = validation({ cmpname })
            const Data = await companyData({ cmpname: validatedName.cmpname })
            return Data;

        }catch(err){
            throw err
        }
    }


    function validation({ cmpname }) {
        const { error, value } = Joi.object({
            cmpname: Joi.string().min(3).max(20).required()
        }).validate({ cmpname })

        if (error) {
            throw  error.details[0].message;
        }
        else{
            return value;
        }
    }
}


