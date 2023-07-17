module.exports = function makeCreateCompanyAction({createCompany}){
    return async function createCompanyAction(req, res){

        try{
            const { name, city, address, contact } = req.body;
            const newCompany = await createCompany ({name, city, address, contact})
            res.status(200).json({
                status: "New Company Created Successfully",
                data: newCompany
            })
        }
        catch(err){
            res.status(404).json({
                status: "Error", 
                data: err
            })
        }
    }
}