const employeeTable = 'employeetable';
const roleTable = 'roletable';
const assignedRole = 'assigned_role';

function makeEmployee({ cockroach }) {
  return Object.freeze({
    createEmployee,
    getAllEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee,
    createRole,
    getAllRoleDetails,
    deleteRole,
    updateRole,
    getRoleDataById,
    assignRole,
    getAssignedRole,
    getByIdAssignedRole,
    deleteAssignedrole,
    deleteEmployeesByCompanyId
  });

  async function createEmployee({ cmpId, empName, contact, role }) {
    try {
      console.log(cmpId, empName, contact, role);
      const createEmp = await cockroach.query(`INSERT INTO ${employeeTable} (cmpId, EmpId, empName, contact, role) VALUES('${cmpId}', gen_random_uuid(), '${empName}', '${contact}', '${role}') RETURNING * `);
      
      const result = createEmp && createEmp.rows || false;
      

      if (!result || !result.length) {

        return false

      }

      return result[0].empid;
    }

    catch (err) {
      throw err;
    }
  }

  async function getAllEmployee() {

    try {
      const allEmployeeData = await cockroach.query(`select * from ${employeeTable}`);

      const result = allEmployeeData && allEmployeeData.rows || false;

      if (!result || !result.length) {

        return []

      }

      return result;

    }
    catch (err) {
      throw err
    }
  }

  async function getEmployee({ id }) {
    try {

      const getDataById = await cockroach.query(`select * from ${employeeTable} where empid = '${id}' `)

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

  async function deleteEmployee({ id }) {
    try {
       await cockroach.query(`delete from ${employeeTable} where empid = '${id}'`)
    }
    catch (err) {
      throw err
    }
  }

  async function deleteEmployeesByCompanyId({ companyId }) {
    try {
       await cockroach.query(`delete from ${employeeTable} where cmpid = '${companyId}'`)
    }
    catch (err) {
      throw err
    }
  }


  async function updateEmployee({ updateData, id }) {

    try {
      const update = [];
      Object.entries(updateData).forEach(([key, value]) => {
        update.push(`${key} = '${value}'`);
      });

     await cockroach.query(`UPDATE ${employeeTable} SET ${update.join(',')} WHERE empid = '${id}'`)

    }
    catch (err) {
      throw err
    }
  }

  //////////////////////////////////////////////////////////////////////
  // API for role /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  async function createRole({ roleName, companyid, permission }) {
    try {

      const createRole = await cockroach.query(`INSERT INTO ${roleTable} (roleid, roleName, companyid, permission) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *`, [roleName, companyid, JSON.stringify(permission)]);
     
      const result = createRole && createRole.rows || false;

      if (!result || !result.length ) {

        return false

      }
      return result[0].roleid;

    } catch (err) {

      throw err;
    }
  }

  async function getAllRoleDetails() {
    try {

      const allRoleDetails = await cockroach.query(`select * from ${roleTable}`);

      const result = allRoleDetails && allRoleDetails.rows || false;

      if ( !result || !result.length ) {
        
        return []

      }

      return result;
    }
    catch (err) {
      throw err
    }
  }

  async function deleteRole({ id }) {

    try {

       await cockroach.query(`delete from ${roleTable} where roleid = '${id}'`)

    }
    catch (err) {
      throw err
    }

  }

  async function updateRole({ roleName, permission, id }) {
    try {
      const query = `UPDATE ${roleTable} SET roleName = $1, permission = $2 WHERE roleId = $3`;
      const values = [roleName, permission, id];

       await cockroach.query(query, values);

    } 
    catch (err) {
      throw err;
    }
  }


  async function getRoleDataById({ id }) {
    try {

      const getDataById = await cockroach.query(`select * from ${roleTable} where roleid = '${id}'`)

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

  ////////////////////////////////////////////////////////////////////////
  // Assigned Role Api //////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  async function assignRole({ roleid, employeeid }) {

    try {

       await cockroach.query(`insert into ${assignedRole} (id, role_id, employee_id) values(gen_random_uuid(), '${roleid}', '${employeeid}')`)

    }
    catch (err) {
      throw err
    }
  }

  async function getAssignedRole() {
    try {
      const getAssignedRole = await cockroach.query(`select * from ${assignedRole}`)

      const result = getAssignedRole && getAssignedRole.rows || false;

      if (!result || !result.length) {

        return false

      }

      return result;
    }
    catch (err) {
      throw err
    }
  }

  async function getByIdAssignedRole({ id }) {
    try {
      const getAssignedRole = await cockroach.query(`select * from ${assignedRole} where employee_id = '${id}'`)
   
      const result = getAssignedRole && getAssignedRole.rows || false;

      if (!result || !result.length) {
        return false
      }

      return result
    }
    catch (err) {
      throw err
    }
  }

  async function deleteAssignedrole({ id }) {
    try {

      await cockroach.query(`delete from ${assignedRole} where id = '${id}'`)

    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = makeEmployee;