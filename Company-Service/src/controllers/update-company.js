module.exports = function makeUpdateCompanyAction({ updateCompany }) {
    return async function updateCompanyAction(req, res) {

        try {
            const id = req.params.id;
            const updateData = req.body;
            await updateCompany({updateData, id})

            res.status(200).json({
                status: "Success",
                data: { message: "Company Data is Updated" }
            })
        }
        catch (err) {
            res.status(400).json({
                status: "Fail",
                data: { error: err }
            })
        }
    }
}