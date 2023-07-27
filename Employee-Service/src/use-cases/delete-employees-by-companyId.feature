Feature: Delete Employee by Company Id

    Scenario Outline: Try to delete employees with invalid company id, then it will throw error.
        Given Employees details companyId:'<companyId>' to delete employees 
        When  Try to delete employees with invalid companyId
        Then  It will throw error with message: '<message>' while deleting employees data

        Examples:
            | companyId | message                          |
            | 123       | "companyId" must be a valid GUID |

    
    Scenario Outline: Try to delete employees with valid company id, then it will throw error.
        Given Employees details companyId:'<companyId>' to delete employees successfully
        When Try to delete employees with valid companyId
        Then It will delete employees with message: '<message>'

        Examples:
            | companyId                            | message                        |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Employees deleted successfully |
