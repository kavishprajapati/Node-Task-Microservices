Feature: Get Company Data by Name

    Scenario Outline: Try to get company data with invalid details, then it will throw error.
        Given company details companyname:"<companyname>" to get company data successfully
        When Try to get company data with invalid name
        Then It will throw error with message: '<message>'

        Examples:
            | companyname | message                                                 |
            | dk          | "companyname" length must be at least 3 characters long |


    Scenario Outline: Try to get company data with valid details, then it will throw error.
        Given existing company details companyname:"<companyname>" to get company data successfully
        When Try to get company data with valid name
        Then It will get company data with message: "<message>"

        Examples:
            | companyname | message                         |
            | Rapidops    | "Got company data successfully" |