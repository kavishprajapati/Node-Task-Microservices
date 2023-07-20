module.exports = function makeGetCompanyByName({ companyTable, Joi }){
    return async function getCompanyByName({companyname}){
        try{
            const validatedName = validateData({ companyname })
            return await companyTable.getCompanyByName({ companyname: validatedName.companyname })

        }catch(err){
            throw err
        }
    }


    function validateData({ companyname }) {
        const { error, value } = Joi.object({
            companyname: Joi.string().min(3).max(20).required()
        }).validate({ companyname })

        if (error) {
            throw  error.details[0].message;
        }
        
        return value;
        
    }
}

