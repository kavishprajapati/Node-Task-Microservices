Feature: User login

    Scenario Outline: User Try to Login with invalid credentails, then it will throw error.
        Given User credentails username:'<username>', password:'<password>' to login
        When  User try to login
        Then  It will throw error with message: '<message>' while user trying to login

        Examples:
            | username | password | message                                                         |
            |          |          | "username" is required                                          | 
            | Amit     |          | "password" is required                                          |
            | Amit     | Abc      | "password" with value "Abc" fails to match the password pattern |               

    Scenario Outline: User Try to login with valid credentails.
        Given User credentails username:'<username>', password:'<password>' to login successfully
        When  User try to login with valid credentails
        Then  User will login successfully with message: '<message>'

        Examples:
            | username   | password   | message                      |
            | kavish     | Abc@12345& | User loggedIn successfully | 