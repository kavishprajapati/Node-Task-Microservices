module.exports = function makeGetAllCompanyAction({ getAllCompany }) {
    return async function getAllCompanyAction(req, res) {
        try {
            const companyData = await getAllCompany();
            res.status(200).json({
                status: "Success",
                data: { companyData }
            })
        } 
        catch (err) {
            res.status(400).json({
                status: "fail",
                data: {
                    error: err
                }
            })
        }
    }
}