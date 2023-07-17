module.exports = function makeUserLoginAction({ userLogin }){
    return async function userLoginAction(req, res){
        try{
            const { username, password } = req.body
            await userLogin({ username, password })
            res.status(201).json({
                status: "Success",
                data: "User Authenticated",
                data: "User Logged In Successfully"
            })
        }
        catch(err){
            res.status(404).json({
                status: "Fail",
                data: "User Authentication Failed"
            })
        }
    }
}