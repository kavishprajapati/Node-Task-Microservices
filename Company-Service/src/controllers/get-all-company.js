module.exports = function makeGetAllCompanyAction({ getAllCompany }) {
    return async function getAllCompanyAction(req, res) {
        try {
            const companyData = await getAllCompany();
            res.status(200).json({
                status: "Success",
                data: { companyData: companyData }
            })
        }
        catch (err) {
            res.status(404).json({
                status: "Fail",
                data: { error: err }
            })
        }
    }
}


