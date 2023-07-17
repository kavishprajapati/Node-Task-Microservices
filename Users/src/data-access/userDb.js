function makeUserDb({ cockroach, bcrypt }) {
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
            const createUser = await cockroach.query(`INSERT INTO user_table (userid, username, useremail, password) VALUES (gen_random_uuid(), '${username}', '${useremail}', '${encryptedPassword}')`);
        }
        catch (err) {
            throw err
        }
    }

    async function getAllUser() {
        try {
            const allUser = await cockroach.query("select * from user_table")
            const result = allUser.rows;

            if (!result || result.length === 0) {
                throw new Error(" No User Data Found ")
            }

            return result
        }
        catch (err) {
            throw err
        }
    }

    async function getUserDataById({ id }) {
        try {
            const getDataById = await cockroach.query(`select * from user_table where userid = '${id}'`)
            const result = getDataById.rows

            if (!result || result.length === 0) {

                throw new Error("No data is present with this id")
            }

            return result;

        }
        catch (err) {
            throw err
        }
    }

    async function deleteUser({ id }) {
        try {
            const userdelete = cockroach.query(`delete from user_table where userid = '${id}'`)
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

            const updateQuery = await cockroach.query(`UPDATE user_table SET ${update.join(',')} WHERE userid = '${id}'`);
        } catch (err) {
            throw err;
        }
    }

    async function getUserByName({ username }) {
        try {
            const loggedUser = await cockroach.query(`select * from user_table where username = '${username}'`)

            const result = loggedUser.rows

            if (!result || result.length === 0) {
                throw new Error("User Not Found")
            }

            return result;
        }
        catch (err) {
            throw err
        }
    }

    async function storeUserjwtToken({ userid, token }) {
        try {
            const storeToken = await cockroach.query(`INSERT INTO usertoken_table (userid, jwttoken) VALUES('${userid}', '${token}')`)
        }

        catch (err) {
            throw err
        }

    }


}


module.exports = makeUserDb