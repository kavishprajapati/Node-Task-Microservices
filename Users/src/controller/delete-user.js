module.exports = function makeDeleteUserAction({ deleteUser }){
    return async function deleteUserAction(req, res){
        try{
            const id = req.params.id
            const userdeleted = await deleteUser({ id })
            res.status(204).json({
                status: "Success",
                data: "User Deleted Successfully"
            })

        }
        catch(err){
            res.status(400).json({
                status: "fail",
                data: "Cannot able to delete user"
            })
        }
    }
}