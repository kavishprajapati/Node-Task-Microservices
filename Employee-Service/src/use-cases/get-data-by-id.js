module.exports = function makeGetEmployeeDataById({ EmployeeData, Joi, getCompanyData }) {
    return async function getEmployeeDataById({ id }) {
      try {
        const validatedId = validation({ id });
        const data = await EmployeeData({ id: validatedId.id });
  
        const cmpid = data[0].cmpid;
  
        const companyData = await getCompanyData({ cmpid });
  
        const joinedData = data.map(item => {
          const { cmpid, ...rest } = item;
          const matchingItem = companyData.find(companyItem => companyItem.id === item.cmpid);
          const { id, ...companyDataWithoutId } = matchingItem;
          return { ...rest, ...companyDataWithoutId };
        });
        
        return joinedData
      } catch (err) {
        throw err;
      }
    };
  
    function validation({ id }) {
      const { error, value } = Joi.object({
        id: Joi.string().uuid().required()
      }).validate({ id });
  
      if (error) {
        throw new Error(error.details[0].message);
      } else {
        return value;
      }
    }
  };
  