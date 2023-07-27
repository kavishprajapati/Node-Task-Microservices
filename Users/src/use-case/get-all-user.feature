Feature: Get All User

    Scenario Outline: Get All User Successfully
        When I request to get all users
        Then I should get all users 

        Examples:
            | message                                                                                                                                                                                      |
            | '[{"userid": "02d39e89-6aa8-4ae6-8ab0-0f1f2d3b2dc0","username": "krushanu","useremail": "krushanu@rapidops.com","password": "2b$10$CpSNqQ2RMxxYPvM6MipgOexI3.l8GZEfjLu.dUjV/ABPm/OGBrDka"}]' |
