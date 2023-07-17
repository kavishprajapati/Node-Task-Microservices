function makeCompanyDb({ cockroach }) {
    return Object.freeze({
        getAllCompanyData,
        createCompany,
        deleteCompany,
        getCompanyData,
        updateCompany,
        getDataByName
    });

    async function getAllCompanyData() {

        try {
            const data = await cockroach.query("select * from companytable")
         
            const result = data.rows;

            if (!result || result.length === 0) {
                throw new Error("No company data found")
            }

            return result;
        }
        catch (err) {
            throw err
        }
    }

    async function getCompanyData({ id }) {

        try {
            const getData = await cockroach.query(`select * from companytable where id = '${id}'`)
          
            const result = getData.rows;
            
            if (!result || result.length === 0) {
                throw new Error("No data is present with this id")
            }

            return result;
        }
        catch (err) {
            throw err
        }

    }


    async function createCompany({ name, city, address, contact }) {

        try {
            const createCompany = await cockroach.query(`insert into companytable (id, name, city, address, contact) values(gen_random_uuid(), '${name}', '${city}', '${address}', '${contact}')  RETURNING *`);

            if(createCompany.rows.length === 0 ){
                throw new Error("Failed to create company")
            }
            return createCompany.rows[0];
        }
        catch (err) {
            throw err;
        }
    }


    async function deleteCompany({ id }) {
        try {
            const deleteQuery = await cockroach.query(`delete from companytable where id = '${id}'`)
         
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


            const updateQuery = await cockroach.query(`UPDATE companytable SET ${update.join(',')} WHERE id = '${id}'`)
     
        }
        catch (err) {
            throw err
        }
    }


    async function getDataByName({ cmpname }) {
        try {
            
            const dataByNameQuery = await cockroach.query(`select * from companytable where name = '${cmpname}'`)
  

            const result = dataByNameQuery.rows;

            if (!result || result.length === 0) {
                throw new Error("No company data found")
            }

            return result;
        }
        catch (err) {
            throw err
        }
    }

}



module.exports = makeCompanyDb