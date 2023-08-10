module.exports = function makeCreateCompanyAction({createCompany}){
    return async function createCompanyAction(req, res){

        try{
            const { name, city, address, contact } = req.body;
            const newCompany = await createCompany ({name, city, address, contact})
            res.status(201).json({
                status: "Success",
                data: newCompany
            })
        }
        catch(err){
            res.status(400).json({
                status: "Error", 
                data: err
            })
        }
    }
}