Feature: Use-case update employee data

    Scenario Outline: Try to update employee data with invalid data, then it will throw error.
        Given Employee details updateData:'<updateData>', id:'<id>' to update employee
        When Try to update employee data
        Then It will throw error with message: '<message>' while updating a employee details

        Examples:
            | id  | updateData                        | message                     |
            | 123 | {}                                | Update data cannot be empty |
            | 123 | {"empname":"Arham","role":"user"} | "id" must be a valid GUID   |

    
    Scenario Outline: Try to update employee data with valid data
        Given Employee details updateData:'<updateData>', id:'<id>' to update employee
        When Try to update employee data
        Then It will update employee data with message:'<message>'
            
        Examples:
            | id                                   | updateData                        | message                            |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | {"empname":"Arham"}               | Employee data updated successfully |