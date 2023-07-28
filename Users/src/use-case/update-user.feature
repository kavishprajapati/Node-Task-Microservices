Feature: Use-case to update user data

    Scenario Outline: Try to update user data with invalid data, then it will throw error.
        Given user details updateUserData:'<updateUserData>', id:'<id>' to update user
        When Try to update user data
        Then It will throw error with message: '<message>' while updating a user details

        Examples:
            | id  | updateUserData                                           | message                     |
            | 123 | {}                                                       | Update data cannot be empty |
            | 123 | {"username":"kavish","useremail":"kavish@gmail.com"}     | "id" must be a valid GUID   |


    Scenario Outline: Try to update user data with valid data.
        Given user details updateUserData:'<updateUserData>', id:'<id>' to update user
        When  Try to update user data
        Then  It will update user data with message:'<message>'

        Examples:
            | id                                   | updateUserData                                       | message                        |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | {"username":"kavish","useremail":"kavish@gmail.com"} | user data updated successfully |
            