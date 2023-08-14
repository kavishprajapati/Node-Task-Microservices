module.exports = function makeGetCompanyByNameAction({ getCompanyByName }) {
    return async function getCompanyByNameAction(req, res) {
        try {
            const companyname = req.params.name
            const companyData = await getCompanyByName({ companyname });
            res.status(200).json({
                status: "Success",
                data: { companyData: companyData }
            })
        }
        catch (err) {
            res.status(400).json({
                status: "fail",
                data: { error: err }
            })
        }
    }
}


