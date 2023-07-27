Feature: Get All Assigned Role

    Scenario Outline: Get All assigned Role
        When I request to get all Assigned Role
        Then I should get all Assigned Role

        Examples:
            | message                                                                                                                                                    |    
            | '[{"id": "0a3a88db-8fc4-4b75-ac8b-ee3c83f5a2d6","role_id": "0f3ae90e-97e2-4fe8-8b33-e603d99dee55","employee_id": "35416500-da4e-453c-a44f-a859315df8f6"}]' |