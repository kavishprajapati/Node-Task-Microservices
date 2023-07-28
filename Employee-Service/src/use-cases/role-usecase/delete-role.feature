Feature: Use-case delete role 

    Scenario Outline: Try to delete role with invalid id, then it will throw error.
        Given Role details id:'<id>' to delete role 
        When  Try to delete role
        Then  It will throw error with message: '<message>' while deleting role

        Examples:
            | id  | message                   |
            | 123 | "id" must be a valid GUID |

    Scenario Outline: Try to delete role with valid id.        
        Given Role details id:'<id>' to delete role
        When  Try to delete role
        Then  It will delete role with message: '<message>'

        Examples:
            | id                                   | message                   |
            | 02d39e89-6aa8-4ae6-8ab0-0f1f2d3b2dc0 | role deleted successfully |