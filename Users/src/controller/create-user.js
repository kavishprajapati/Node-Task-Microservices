module.exports = function makeCreateUserAction({ createUser }) {
    return async function createUserAction(req, res) {
        try {
            const { username, useremail, password } = req.body;
            const newUser = await createUser({ username, useremail, password })

            res.status(201).json({
                status: "Success",
                Data: { userid: newUser }
            })
        }
        catch (err) {
            res.status(400).json({
                status: "Fail",
                Data: { error: err }
            })
        }
    }
}