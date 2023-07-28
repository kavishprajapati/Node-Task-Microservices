Feature: Use-case get all role

    Scenario Outline: get all role
        When I request to get all Role
        Then I should get all Role

        Examples:
            | message                                                                                                                                                    |    
            | '[{"role_id": "0a3a88db-8fc4-4b75-ac8b-ee3c83f5a2d6"}]' |