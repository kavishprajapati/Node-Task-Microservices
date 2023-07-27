Feature: Get All Company

    Scenario Outline: Get All Company Successfully
        When I request to get all companies 
        Then I should get all companies 

        Examples:
            | message                                                                                                                                         |
            | '[{"id": "10931d13-2632-4861-aefb-914f9c74f0dd","name": "Microsoft","city": "Banglore","address": "happy street","contact": "2121212121"}]'     |