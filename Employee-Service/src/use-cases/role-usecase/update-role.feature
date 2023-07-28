Feature: Use-case update role 

    Scenario Outline: Try to update role with invalid details, then it will throw error.
        Given role details roleName:'<roleName>', permission:'<permission>', id:'<id>' to update role
        When Try to update role of employee
        Then It will throw error with message: '<message>' while updating a role details

        Examples:
            | id                                   | roleName | permission    | message                   |
            | 123                                  |          |    {}         | "id" must be a valid GUID |  
            | 08c0a174-2e65-49dc-8e86-b79e516150df |          |    {}         | "roleName" is required    |
           

    Scenario Outline: Try to update role with valid details
        Given role details roleName:'<roleName>', permission:'<permission>', id:'<id>' to update role
        When  Try to update role of employee
        Then  It will update a role details with message: '<message>'

        Examples:
            | id                                   | roleName | permission                                                                                                                           | message         |
            | 08c0a174-2e65-49dc-8e86-b79e516150df | admin    | {"employee": {"create":true,"delete":true,"read":true,"update":true},"role":{"create":true,"delete":true,"read":true,"update":true}} | Role is updated |
             