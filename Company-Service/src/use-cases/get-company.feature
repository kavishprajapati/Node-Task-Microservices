Feature: Use-case to Get Company Data By Id

    Scenario Outline: Try to get company data with invalid id, then it will throw error.
        Given company details id:"<id>" to get company data
        When  Try to get company data by id
        Then  It will throw error with message: '<message>' while getting company data

        Examples: 
            | id  | message                   |
            | 564 | "id" must be a valid GUID |

    
    Scenario Outline: Try to get company data with valid id
        Given company details id:"<id>" to get company data
        When  Try to get company data by id
        Then  It will get company data with message: '<message>' successfully

        Examples:
            | id                                   | message                         |    
            | 3d8021d4-10af-461e-956a-92faa2b6447b | Got company data successfully   |
 