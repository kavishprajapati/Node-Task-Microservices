Feature: Use-case Update Company Data

    Scenario Outline: Try to update company data with invalid data, then it will throw error.
        Given Company details updateData:'<updateData>', id:'<id>' to update company
        When Try to update company data
        Then It will throw error with message: '<message>' while updating a company details

        Examples:
            | id    | updateData                            |  message                      |
            |  786  |  {}                                   |  Update data cannot be empty  |
            |  789  |  {"name":"kavish","city":"XYZABC"}    |  "id" must be a valid GUID    |


    Scenario Outline: Try to update company data with valid data.
        Given Company details updateData:'<updateData>', id:'<id>' to update company
        When Try to update company data
        Then It will update company data with message:'<message>' 

        Examples:
            | id                                   | updateData                        | message                           |
            | 3d8021d4-10af-461e-956a-92faa2b6447b | {"name":"kavish","city":"XYZABC"} | Company data updated successfully |    