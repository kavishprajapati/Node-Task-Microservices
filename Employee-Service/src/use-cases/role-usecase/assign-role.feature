Feature: Use-Case assign role to an employee

    Scenario Outline: Try to assign role to an employee with invalid details, then it will throw error.
        Given Assign role details roleid:'<roleid>', employeeid:'<employeeid>' to assign role to employee
        When Try to assign role to employee
        Then It will throw error with message: '<message>' while assign role to employee

        Examples:
            | roleid                               | employeeid | message                           |
            |                                      |            | "roleid" is required              |
            | 123                                  |            | "roleid" must be a valid GUID     |
            | 0f3ae90e-97e2-4fe8-8b33-e603d99dee55 |            | "employeeid" is required          |
            | 0f3ae90e-97e2-4fe8-8b33-e603d99dee55 | 123        | "employeeid" must be a valid GUID |


    Scenario Outline: Try to assign role to an employee with valid details, then it will throw error.
        Given Assign role details roleid:'<roleid>', employeeid:'<employeeid>' to assign role to employee
        When  Try to assign role to employee
        Then  It will assign role to an employee with message:'<message>'

        Examples:
            | roleid                               | employeeid                           | message                                      |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | 3d8021d4-10af-461e-956a-92faa2b6447b | Role is assigned Successfully to an employee |
             