Feature: Get Employee Data By Id

    Scenario Outline: Try to get employee data with invalid id, then it will throw error.
        Given employee details id:"<id>" to get employee data 
        When  Try to get employee data with invalid id 
        Then  It will throw error with message: '<message>' while getting employee data

        Examples: 
            | id  | message                   |
            | 564 | "id" must be a valid GUID |

    
    Scenario Outline: Try to get employee data with valid id.
        Given existing employee details id:"<id>" to get employee data successfully
        When  Try to get employee data with valid id
        Then  It will get employee data with message: '<message>'

        Examples:
            | id                                   | message                          |    
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Got employee data successfully   |
 