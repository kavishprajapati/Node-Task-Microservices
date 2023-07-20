module.exports = function makeGetAllUser({ userTable }){
    return async function getAllUser(){
        try{
            return await userTable.getAllUser()
        }
        catch(err){
            throw err
        }
    }
}

