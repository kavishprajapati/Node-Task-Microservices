module.exports = function makeGetAllUser({ userTable }){
    return async function getAllUser(){
        try{
            const result =  await userTable.getAllUser()
            return result;
        }
        
        catch(err){
            throw err
        }
    }
}