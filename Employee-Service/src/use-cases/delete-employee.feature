Feature: Delete Employee

    Scenario Outline: Try to delete employee with invalid details, then it will throw error.
        Given employee details id:'<id>' to delete employee
        When Try to delete employee with invalid id
        Then It will throw error with message: '<message>' while deleting employee

        Examples:
            | id  | message                   |  
            | 123 | "id" must be a valid GUID |

    Scenario Outline:  Try to delete employee with valid details, then it will throw error.
        Given employee details id:'<id>' to delete employee successfully
        When  Try to delete employee with valid id     
        Then It will delete employee with message: "<message>"

        Examples:
            | id                                   | message                       |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | employee deleted successfully |

