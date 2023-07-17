module.exports = function makeGetAllCompanyAction({ getAllCompany }) {
    return async function getAllCompanyAction(req, res) {
        try {
            const cmpData = await getAllCompany();
            res.status(200).json({
                status: "Success",
                data: { cmpData }
            })
        } 
        catch (err) {
            res.status(404).json({
                status: "fail",
                data: {
                    error: err
                }
            })
        }
    }
}