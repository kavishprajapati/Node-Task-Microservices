Feature: Get User Data by Id

    Scenario Outline: Try to get user data with invalid id, then it will throw error.
        Given user details id:'<id>' to get user data 
        When Try to get user data with invalid id
        Then It will throw error with message: '<message>' while getting user data

        Examples:
            | id  | message                   |
            | 123 | "id" must be a valid GUID |


    Scenario Outline: Try to get user data with valid id, then it will throw error.
        Given user details id:'<id>' to get user data successfully
        When Try to get user data with valid id
        Then It will get user data with message: '<message>'

        Examples:
            | id                                   | message                    |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Got user data successfully |
        
