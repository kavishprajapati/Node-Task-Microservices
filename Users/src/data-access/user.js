const userTable = 'user_table';
const userTokenTable = 'usertoken_table';

function makeUser({ cockroach, bcrypt }) {
    return Object.freeze({
        createUser,
        getAllUser,
        getUserDataById,
        deleteUser,
        updateUser,
        getUserByName,
        storeUserjwtToken
    })
    
    async function createUser({ username, useremail, password }) {
        try {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const createUser = await cockroach.query(`INSERT INTO ${userTable} (userid, username, useremail, password) VALUES (gen_random_uuid(), '${username}', '${useremail}', '${encryptedPassword}') RETURNING *`);
            
            const result = createUser && createUser.rows || false;
        
            if ( !result || !result.length ){
                
                return false
            }

            return result[0].userid;

        }
        catch (err) {
            throw err
        }
    }

    async function getAllUser() {
        try {
            const allUser = await cockroach.query(`select * from ${userTable}`)

            const result = allUser && allUser.rows || false;

            if (!result || !result.length ) {

                return []
            }

            return result
        }
        catch (err) {
            throw err
        }
    }

    async function getUserDataById({ id }) {
        try {
            const getDataById = await cockroach.query(`select * from ${userTable} where userid = '${id}'`)

            const result = getDataById && getDataById.rows || false; 

            if (!result || !result.length) {

                return false
            }

            return result;

        }
        catch (err) {
            throw err
        }
    }

    async function deleteUser({ id }) {
        try {
            cockroach.query(`delete from ${userTable} where userid = '${id}'`)
        }
        catch (err) {
            throw err
        }
    }


    async function updateUser({ updateUserData, id }) {
        try {
            const { username, useremail, password } = updateUserData;
            const encryptedPassword = await bcrypt.hash(password, 10);

            const update = [];
            Object.entries(updateUserData).forEach(([key, value]) => {
                if (key !== 'password') {
                    update.push(`${key} = '${value}'`);
                }
            });

            update.push(`password = '${encryptedPassword}'`);

             await cockroach.query(`UPDATE ${userTable} SET ${update.join(',')} WHERE userid = '${id}'`);
        }
        catch (err) {
            throw err;
        }
    }

    async function getUserByName({ username }) {
        try {
            const loggedUser = await cockroach.query(`select * from ${userTable} where username = '${username}'`)
       
            const result = loggedUser && loggedUser.rows || false; 

            if (!result || !result.length ){
                
                return false
            }

            return result;
        }
        catch (err) {
            throw err
        }
    }

    async function storeUserjwtToken({ userId, token }) {
        try {
            const storeToken = await cockroach.query(`INSERT INTO ${userTokenTable} (userid, jwttoken) VALUES('${userId}', '${token}')`)
        }
        catch (err) {
            throw err
        }
    }
}

module.exports = makeUser