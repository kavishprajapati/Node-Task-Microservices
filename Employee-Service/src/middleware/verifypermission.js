module.exports = function makeValidateMiddleware({ getByIdAssignedRole, getRoleDataById }) {
    return async function validateMiddleware(req, res, next, public, permission) {
        try {

            if(public){
                next()
            }
            
            // Get bearer token from the request headers
            const authorization = req.headers.authorization;
            const token = authorization.split(' ')[1]; //this is token right now i employee_id

            const assignedRoleData = await getByIdAssignedRole({ id: token });
            const role_id = assignedRoleData[0].role_id;

            const roleData = await getRoleDataById({ id: role_id })

            const permissionOfUser = roleData[0].permission;


            // Extract permission data from the provided permission argument
            const [entity, action] = permission.permission.split('.');



            if (permissionOfUser[entity] && permissionOfUser[entity][action]) {
                console.log("Permission Granted");
                next()
            } else {
                console.log('Permission denied');

                throw err
            }


        } catch (err) {
            res.status(404).json({
                status: "Error",
                data: "Permission Denied"
            })

            // If the token is valid and the user's permission is okay, then allow them to perform the necessary action
            // next();
        };
    }
}
