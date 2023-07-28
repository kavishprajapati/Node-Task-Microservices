Feature: Use-Case to create new user

    Scenario Outline: Try to create new user with invalid details, then it will throw error.
        Given User details username:'<username>', useremail:'<useremail>', password:'<password>' to create user
        When Try to create user
        Then It will throw error with message: '<message>' while create new user with invalid details

        Examples:
            | username | useremail       | password  | message                                                         |
            |          |                 |           | "username" is required                                          |
            | Amit     |                 |           | "useremail" is required                                         |
            | Amit     |  Amit           |           | "useremail" must be a valid email                               |
            | Amit     |  Amit@gmail.com |           | "password" is required                                          |
            | Amit     |  Amit@gmail.com | Abc       | "password" with value "Abc" fails to match the password pattern |
        

    Scenario Outline: Try to create new user with valid details.
        Given User details username:'<username>', useremail:'<useremail>', password:'<password>' to create user
        When Try to create user
        Then It will give message: '<message>' while create new user Successfully

        Examples:
            | username | useremail      | password   | message                       |
            | Amit     | Amit@gmail.com | Abc@12345& | New User Successfully Created |