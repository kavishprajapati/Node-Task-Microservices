Feature: Delete Assigned Role 

    Scenario Outline: Try to delete assgined role with invalid id, then it will throw error.
        Given Role details id:'<id>' to delete assgined role 
        When  Try to delete assigned role with invalid id
        Then  It will throw error with message: '<message>' while deleting assgined role

        Examples:
            | id  | message                   |
            | 123 | "id" must be a valid GUID |

    Scenario Outline: Try to delete assgined role with valid id.        
        Given Role details id:'<id>' to delete assgined role successfully
        When  Try to delete assigned role with valid id
        Then  It will delete assigned role with message: '<message>'

        Examples:
            | id                                   | message                            |
            | 02d39e89-6aa8-4ae6-8ab0-0f1f2d3b2dc0 | assigned role deleted successfully |