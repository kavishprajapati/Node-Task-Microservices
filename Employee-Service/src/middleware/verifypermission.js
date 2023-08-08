module.exports = function makeValidateMiddleware({ getByIdAssignedRole, getRoleDataById }) {
    return async function validateMiddleware(req, res, next, public, permission) {
        try {

            if(public){
                next()
                return;
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

                throw new Error('Permission denied')
            }


        } catch (err) {
            res.status(404).json({
                status: "Error",
                data: err.message
            })
        };
    }
}
