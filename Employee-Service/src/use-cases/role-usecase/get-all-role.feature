Feature: Get All Role

    Scenario Outline: Get All Role
        When I request to get all Role
        Then I should get all Role

        Examples:
            | message                                                                                                                                                    |    
            | '[{"role_id": "0a3a88db-8fc4-4b75-ac8b-ee3c83f5a2d6"}]' |