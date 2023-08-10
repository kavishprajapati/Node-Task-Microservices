module.exports = function makeGetAllUserAction({ getAllUser }){
    return async function getAllUserAction(req, res){
        try{
            const userData = await getAllUser()
            res.status(200).json({
                status: "Success",
                data: { userData }
            })
        }
        catch(err){
            res.status(400).json({
                status: "Fail",
                data: err
            })
        }
    }
}