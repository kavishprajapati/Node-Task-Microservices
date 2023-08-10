module.exports = function makeDeleteUserAction({ deleteUser }){
    return async function deleteUserAction(req, res){
        try{
            const id = req.params.id
            const userdeleted = await deleteUser({ id })
            res.status(200).json({
                status: "Success",
                data: "User Deleted Successfully"
            })
        }
        
        catch(err){
            res.status(500).json({
                status: "Fail",
                data: err
            })
        }
    }
}
