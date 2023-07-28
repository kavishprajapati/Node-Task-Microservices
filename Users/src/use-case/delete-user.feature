Feature: Use-Case to delete user

    Scenario Outline: Try to delete user with invalid details, then it will throw error.
        Given user details id:'<id>' to delete user
        When Try to delete user
        Then It will throw error with message: '<message>' while deleting company

        Examples:
            | id  | message                   |
            | 123 | "id" must be a valid GUID |


    Scenario Outline: Try to delete user with valid details.
        Given user details id:'<id>' to delete user
        When Try to delete user
        Then It will throw error with message: '<message>' while deleting user successfully

        Examples:
            | id                                   | message                   |
            | 02d39e89-6aa8-4ae6-8ab0-0f1f2d3b2dc0 | user deleted successfully |