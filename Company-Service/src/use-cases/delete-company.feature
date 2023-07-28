Feature: Use-case delete company

    Scenario Outline: Try to  delete company with invalid details, then it will throw error.
        Given company details id:"<id>" to delete company
        When Try to delete company
        Then It will throw error with message: '<message>' while deleting company

        Examples:
            | id  | message                   |
            | 787 | "id" must be a valid GUID |


    Scenario Outline: Try to delete company with valid details.
        Given company details id:"<id>" to delete company
        When Try to delete company
        Then It will delete company with message: "<message>"

        Examples:
            | id                                   | message                      |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Company deleted successfully |


            