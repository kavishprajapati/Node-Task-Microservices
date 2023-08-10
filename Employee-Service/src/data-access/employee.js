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

      const createEmp = await cockroach.query(`INSERT INTO EmployeeTable (cmpId, EmpId, empName, contact, role) VALUES('${cmpId}', gen_random_uuid(), '${empName}', '${contact}', '${role}') RETURNING * `);

      if (createEmp.rows.length === 0) {
        throw new Error("Failed to create employee")
      }

      return createEmp.rows[0];
    }
    catch (err) {
      throw err;
    }
  }

  async function getAllEmployee() {

    try {
      const allEmployeeData = await cockroach.query("select * from employeetable");
      
      const result = allEmployeeData.rows;

      if (!result || result.length === 0) {
        throw new Error("Company data not found")
      }

      return result;

    }
    catch (err) {
      throw err
    }
  }

  async function getEmployee({ id }) {
    try {

      const getDataById = await cockroach.query(`select * from employeetable where empid = '${id}' `)
     
      const result = getDataById.rows;

      if (!result || result.length === 0) {
        throw new Error("Company Data Not Found")
      }

      return result;

    }
    catch (err) {
      throw err
    }
  }

  async function deleteEmployee({ id }) {
    try {
      const deleteEmployee = await cockroach.query(`delete from employeetable where empid = '${id}'`)
    }
    catch (err) {
      throw err
    }
  }

  async function deleteEmployeesByCompanyId({ companyId }) {
    try{
      const deleteEmployees = await cockroach.query(`delete from employeetable where cmpid = '${companyId}'`)
    }
    catch(err){
      throw err
    }
  }


  async function updateEmployee({ updateData, id }) {

    try {
      const update = [];
      Object.entries(updateData).forEach(([key, value]) => {
        update.push(`${key} = '${value}'`);
      });

      const updateQuery = await cockroach.query(`UPDATE employeetable SET ${update.join(',')} WHERE empid = '${id}'`)
 
    }
    catch (err) {
      throw err
    }
  }

  ///////////////////
  // API for role ///
  ///////////////////
  async function createRole({ roleName, companyid, permission }) {
    try {
      console.log(roleName, companyid, permission);

      const createRole = await cockroach.query(`INSERT INTO roletable (roleid, roleName, companyid, permission) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *`, [roleName, companyid, JSON.stringify(permission)]);
      const result = createRole.rows[0]

      
      if(!result || result.length === 0){
        throw new Error("Assigned Role Data Not Found")
      }
      console.log(result);
      
      return result;
      
    } catch (err) {
      throw err;
    }
  }
  
  async function getAllRoleDetails() {
    try {
      
      const allRoleDetails = await cockroach.query("select * from roletable");
      
      const result = allRoleDetails.rows

      if (!result || result.length === 0) {
        throw new Error("Role data not found")
      }

      return result;
    }
    catch (err) {
      throw err
    }
  }
  
  async function deleteRole({ id }) {
    
    try {
      const deleterole = await cockroach.query(`delete from roletable where roleid = '${id}'`)
    
    }
    catch (err) {
      throw err
    }
    
  }
  
  async function updateRole({ roleName, permission, id }) {
    try {
      const query = `UPDATE roleTable SET roleName = $1, permission = $2 WHERE roleId = $3`;
      const values = [roleName, permission, id];
      
      const result = await cockroach.query(query, values);
      
    } catch (err) {
      throw err;
    }
  }


  async function getRoleDataById({ id }) {
    try {
      
      const getDataById = await cockroach.query(`select * from roletable where roleid = '${id}'`)
      
      const result = getDataById.rows;
      
      
      if (!result || result.length === 0) {
        throw new Error("Company Data Not Found")
      }
      
      return result;
      
    }
    catch (err) {
      throw err
    }
  }
  
  ///////////////////////
  // Assigned Role Api //
  ///////////////////////
  async function assignRole({ roleid, employeeid }) {
    
    try {
      console.log(roleid);
      console.log(employeeid);
      const roleAssigned = await cockroach.query(`insert into assigned_role (id, role_id, employee_id) values(gen_random_uuid(), '${roleid}', '${employeeid}')`)
      
    
    }
    catch (err) {
      throw err
    }
  }

  async function getAssignedRole() {
    try {
      const getAssignedRole = await cockroach.query(`select * from assigned_role`)
      const result = getAssignedRole.rows

      if (!result || result.length === 0) {
        throw new Error("AssignedRole data not found")
      }

      return result;
    }
    catch (err) {
      throw err
    }
  }

  async function getByIdAssignedRole({ id }){
    try{
      const getAssignedRole = await cockroach.query(`select * from assigned_role where employee_id = '${id}'`)
      const result = getAssignedRole.rows

      if(!result || result.length === 0){
        throw new Error("Assigned Role not Found")
      }
      return result
    }
    catch(err){
      throw err
    }
  }

  async function deleteAssignedrole({ id }) {
    try {

      const deleteAssignedRole = await cockroach.query(`delete from assigned_role where id = '${id}'`)
      
    }
    catch (err) {
      throw err;
    }
  }

}

module.exports = makeEmployee;
