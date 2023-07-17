module.exports = function makeGetAllUser({ userData }){
    return async function getAllUser(){
        try{
            const userdata = await userData()
            return userdata
        }
        catch(err){
            throw err
        }
    }
}

