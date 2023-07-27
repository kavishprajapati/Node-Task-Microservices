Feature: Create Role 

    Scenario Outline: Try to create role with invalid details, then it will throw error.
        Given Role details companyid:'<companyid>', roleName:'<roleName>', permission:'<permission>' to create role 
        When Try to create Role with invalid details
        Then It will throw error with message: '<message>' while creating new role

        Examples:
            | companyid                            | roleName | permission | message                          |
            | 123                                  |          |            | "companyid" must be a valid GUID |               
            | 3d8021d4-10af-461e-956a-92faa2b6447b |          |            | "roleName" is required           |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | admin    |            | "permission" is required         |


    Scenario Outline: Try to create role with valid details
        Given Role details companyid:'<companyid>', roleName:'<roleName>', permission:'<permission>' to create role Successfully
        When  Try to create role  with valid details
        Then  It will create role Successfully with message:'<message>'

        Examples:
            | companyid                            | roleName | permission                                                                                                                           | message             |                                                                                                                 
            | 3d8021d4-10af-461e-956a-92faa2b6447b | admin    | {"employee": {"create":true,"delete":true,"read":true,"update":true},"role":{"create":true,"delete":true,"read":true,"update":true}} | New Role Is Created |
