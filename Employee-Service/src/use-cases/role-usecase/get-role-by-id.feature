Feature: Get role by id

    Scenario Outline: Try to get role with invalid id, then it will throw error.
        Given role details id:'<id>' to get role details
        When  Try to get role with invalid id
        Then  It will throw error with message: '<message>' while getting role details

        Examples:
            | id  | message                   |
            | 123 | "id" must be a valid GUID |


    Scenario Outline: Try to get role with valid id
        Given role details id:'<id>' to get role details successfully
        When  Try to get role details with valid id 
        Then  It will get role details with message: '<message>'

        Examples:
            | id                                   | message                              |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Got role details successfully        | 