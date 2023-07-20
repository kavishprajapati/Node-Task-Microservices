module.exports = function makeGetUserDataByIdAction({ getUserDataById }){
    return async function getUserDataByIdAction(req, res){
        try{
            const id = req.params.id
            const userdata = await getUserDataById({ id }) 
            res.status(200).json({
                status: "Success",
                data: { userdata }
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                data: "Fail to get data by an id"
            })
        }
    }
}