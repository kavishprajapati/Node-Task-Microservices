module.exports = function makeDeleteUserAction({ deleteUser }){
    return async function deleteUserAction(req, res){
        try{
            const id = req.params.id
            await deleteUser({ id })
            res.status(200).json({
                status: "Success",
                data: { message: "User Deleted Successfully"}
            })
        }
        
        catch(err){
            res.status(404).json({
                status: "Fail",
                data: { error: err }
            })
        }
    }
}
