Feature: Use-case create new company.

    Scenario Outline: Try to create new company with invalid details, then it will throw error.
        Given Company details name:"<name>", city:"<city>", address:"<address>", contact:"<contact>" to create company
        When Try to create new company
        Then It will throw error with message: '<message>' while creating new company

        Examples:
            | name   | city       | address            | contact        | message                                               |
            |        |            |                    |                | "name" is required                                    |  
            | Kavcon |            |                    |                | "city" is required                                    |
            | Kavcon | Ahmedabad  |                    |                | "address" is required                                 |
            | Kavcon | Ahmedabad  | Sindhu Bhavan Road |                | "contact" is required                                 |
            | Ka     | Ahmedabad  | Sindhu Bhavan Road | 9090909090     | "name" length must be at least 3 characters long      |
            | Kavcon | Ahme       | Sindhu Bhavan Road | 9090909090     | "city" length must be at least 5 characters long      |
            | Kavcon | Ahmedabad  | Sin                | 9090909090     | "address" length must be at least 5 characters long   |
            | Kavcon | Ahmedabad  | Sindhu Bhavan Road | 9090           | "contact" must be greater than or equal to 1000000000 |
            | Kavcon | Ahmedabad  | Sindhu Bhavan Road | 90909090909090 | "contact" must be less than or equal to 9999999999    |


    Scenario Outline: Try to create new company with valid details.
        Given Company details name:"<name>", city:"<city>", address:"<address>", contact:"<contact>" to create company
        When Try to create new company
        Then It will create new company with details:"<message>"

        Examples: 
            | name   | city      | address            | contact    | message                            |
            | Kavcon | Ahmedabad | Sindhu Bhavan Road | 6767676767 | New Company Created Successfully   |
            