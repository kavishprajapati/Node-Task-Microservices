Feature: Get assign role by id

    Scenario Outline: Try to get assign role with invalid id, then it will throw error.
        Given assign role details id:'<id>' to get role details
        When  Try to get assign role with invalid id
        Then  It will throw error with message: '<message>' while getting assign role details

        Examples:
            | id  | message                   |
            | 123 | "id" must be a valid GUID |


    Scenario Outline: Try to get assign role with valid id
        Given assign role details id:'<id>' to get assign role details successfully
        When  Try to get assign role details with valid id 
        Then  It will get assign role details with message: '<message>'

        Examples:
            | id                                   | message                              |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Got assign role details successfully | 