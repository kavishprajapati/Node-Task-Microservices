module.exports = function makeGetDataByNameAction({ getDataByName }) {
    return async function getDataByNameAction (req, res) {
        try{
            const cmpname = req.params.name;
            const companyData = await getDataByName({cmpname});
            res.status(200).json({
                status: "Success",
                data: { companyData }
            })
        }
        catch(err){
            res.status(404).json({
                status: "fail",
                data: {
                    error: err
                }
            })
        }
    }
}


  