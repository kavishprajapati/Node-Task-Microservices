const companyTable = 'companytable';

function makeCompany({ cockroach }) {
    return Object.freeze({
        getAllCompanyData,
        createCompany,
        deleteCompany,
        getCompanyData,
        updateCompany,
        getCompanyByName
    });


    async function getAllCompanyData() {

        try {
            const data = await cockroach.query(`select * from ${companyTable}`);

            const result = data && data.rows || false;

            if (!result || !result.length) {

                return []
            }

            return result;
        }
        catch (err) {
            throw err
        }
    }


    async function getCompanyData({ id }) {

        try {
            const getData = await cockroach.query(`select * from ${companyTable} where id = '${id}'`)

            const result = getData && getData.rows || false;

            if (!result || !result.length) {

                return false
            }

            return result;
        }

        catch (err) {
            throw err
        }

    }


    async function createCompany({ name, city, address, contact }) {

        try {
            const createCompany = await cockroach.query(`insert into ${companyTable} (id, name, city, address, contact) values(gen_random_uuid(), '${name}', '${city}', '${address}', '${contact}')  RETURNING *`);

            const result =  createCompany && createCompany.rows || false;

            if (!result || !result.length) {

                return false
            }

            return result[0].id;

        }
        catch (err) {
            throw err;
        }
    }


    async function deleteCompany({ id }) {
        try {

            const deleteQuery = await cockroach.query(`delete from ${companyTable} where id = '${id}'`)
        }
        catch (err) {
            throw err
        }
    }

    async function updateCompany({ updateData, id }) {

        try {
            const update = [];
            Object.entries(updateData).forEach(([key, value]) => {
                update.push(`${key} = '${value}'`);
            });

            const updateQuery = await cockroach.query(`UPDATE ${companyTable} SET ${update.join(',')} WHERE id = '${id}'`)

        }
        catch (err) {
            throw err
        }
    }


    async function getCompanyByName({ companyname }) {
        try {
            const dataByNameQuery = await cockroach.query(`select * from ${companyTable} where name = '${companyname}'`)

            const result = dataByNameQuery && dataByNameQuery.rows || false;

            if (!result || !result.length) {
                return false
            }

            return result;
        }
        catch (err) {
            throw err
        }
    }

}

module.exports = makeCompany