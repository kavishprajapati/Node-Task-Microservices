module.exports = function makeCreateEmployee({ getCompanyId, EmployeeData, Joi, createRole, assignRole }) {
    return async function createEmployee({cmpId ,companyName,  empName, contact, role }) {

        try {
            const validatedData = validation({ cmpId, companyName, empName, contact, role });

            if(validatedData.companyName){
                const companyID = await getCompanyId({ companyName }) //this is internal call which fetch company id from company
                await EmployeeData({ cmpId: companyID, empName: validatedData.empName, contact: validatedData.contact, role: validatedData.role })
            }
            else{
                const empData = await EmployeeData({ cmpId: cmpId, empName: validatedData.empName, contact: validatedData.contact, role: validatedData.role }) 

                const permission = {
                    "employee": {
                        "create": true,
                        "delete": true,
                        "read": true,
                        "update": true
                      },
                      "role": {
                        "create": true,
                        "delete": true,
                        "read": true,
                        "update": true
                      }
                }

                if(empData.role == 'admin'){
                    const result =  await createRole({roleName: empData.role, companyid: empData.cmpid, permission: permission })
                    


                    await assignRole({ roleid: result.roleid, employeeid: empData.empid })
                }

            }

        }
        catch (err) {
            console.log(err);
            throw err;
        }

    

    }

    function validation({ cmpId, companyName, empName, contact, role }) {

        const { error, value } = Joi.object({
            cmpId: Joi.string().uuid().optional(), 
            companyName: Joi.string().min(5).max(100).optional(),
            empName: Joi.string().min(5).max(100).required(),
            contact: Joi.number().integer().min(1000000000).max(9999999999).required(),
            role: Joi.string().min(1).max(100).required()
        }).validate({ cmpId, companyName, empName, contact, role });

        if (error) {
            throw new Error(error.details[0].message);
        }
        else {
            return value;
        }
    }
}