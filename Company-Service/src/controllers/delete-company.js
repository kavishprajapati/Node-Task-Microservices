module.exports = function makeDeleteCompanyAction({ deleteCompany }) {
    return async function deleteCompanyAction(req, res) {

        try {
            const id = req.params.id
            await deleteCompany({ id })

            res.status(200).json({
                status: "Success",
                data: { message: "Company Deleted Successfully" }
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
