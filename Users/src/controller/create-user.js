module.exports = function makeCreateUserAction({ createUser }){
    return async function createUserAction(req, res){
        try{
            const { username, useremail, password } = req.body;
            const userdata = await createUser({ username, useremail, password })
    
            res.status(201).json({
                status: "Success",
                data: "New User Successfully Created"
            })
        }
        catch(err){
            res.status(400).json({
                status: "fail",
                data: err
            })
        }

    }
}