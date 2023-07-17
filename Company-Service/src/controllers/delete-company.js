module.exports = function makeDeleteCompanyAction({deleteCompany}){
    return async function deleteCompanyAction(req, res){

        try{
            const id = req.params.id
            const deleteCompanyID = await deleteCompany({id})
            res.status(200).json({
                status: "Success",
                data: "Company Deleted"
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

