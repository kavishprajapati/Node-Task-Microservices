module.exports = function makeUpdateCompanyAction({ updateCompany }) {
    return async function updateCompanyAction(req, res) {

        try {
            const id = req.params.id;
            const updateData = req.body;
            await updateCompany({updateData, id})
            res.status(201).json({
                status: "Success",
                data: `Company Data is Updated for id ${id}`
            })
        }
        catch (err) {
            res.status(404).json({
                status: "Error",
                data: err
            })
        }
    }
}