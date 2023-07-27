module.exports = function makeGetCompanyAction({getCompany}){
    return async function getCompanyAction(req, res){
        try {
            const id = req.params.id
            const companyData = await getCompany({id});
            res.status(200).json({
                status: "Success",
                data: { companyData }
            })
        } 
        catch (err) {
            res.status(400).json({
                status: "fail",
                data: {
                    error: err.message
                }
            })
        }
    }
}