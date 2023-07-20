module.exports = function makeGetEmployeeDataById({ EmployeeTable, Joi, getCompanyData }) {
    return async function getEmployeeDataById({ id }) {
      try {
        const validatedId = validation({ id });
        const data = await EmployeeTable.getEmployee({ id: validatedId.id });
  
        const companyId = data[0].cmpid;
  
        const companyData = await getCompanyData({ companyId });
  
        const joinedData = data.map(item => {
          const { cmpid, ...rest } = item;
          const matchingItem = companyData.find(companyItem => companyItem.id === item.cmpid);
          const { id, ...companyDataWithoutId } = matchingItem;
          return { ...rest, ...companyDataWithoutId };
        });
        
        return joinedData
      } 
      catch (err) {
        throw err;
      }
    }
  
    function validation({ id }) {
      const { error, value } = Joi.object({
        id: Joi.string().uuid().required()
      }).validate({ id });
  
      if (error) {
        throw new Error(error.details[0].message);
      } 
      
      return value;
    }
  };
  