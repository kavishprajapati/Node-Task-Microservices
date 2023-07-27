module.exports = function makeGetCompanyByName({ companyTable, Joi }){
    return async function getCompanyByName({companyname}){
        try{
            
            const validatedName = validateData({ companyname })
            const companyData =  await companyTable.getCompanyByName({ companyname: validatedName.companyname })
          
            if(!companyData){
                throw new Error("No company data found")
            }

            return companyData

        }
        catch(err){
            console.log(err.message);
            throw err.message;
        }
    }


    function validateData({ companyname }) {
        const { error, value } = Joi.object({
            companyname: Joi.string().min(3).max(20).required()
        }).validate({ companyname })

        if (error) {
            throw error.details[0];
        }
        
        return value;
        
    }
}

