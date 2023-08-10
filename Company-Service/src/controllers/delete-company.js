module.exports = function makeDeleteCompanyAction({deleteCompany}){
    return async function deleteCompanyAction(req, res){

        try{
             const id = req.params.id
             await deleteCompany({id})
            res.status(200).json({
                status: "Success",
                data: "Company Deleted"
            })
        }

        catch(err){
            console.log(err);
            res.status(400).json({
                status: "Error",
                data: err
            })
        }
    }
}