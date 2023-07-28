Feature: Use-case to get all employees

    Scenario Outline: get all employees Successfully
        When I request to get all Employees
        Then I should get all Employees with message: "<message>"

        Examples:
            | message                                                                                                                                                           |
            | '[{"cmpid": "3d8021d4-10af-461e-956a-92faa2b6447b","empid": "1872cdf4-2f69-4709-a48f-61d75769cc77","empname": "kavish","contact": "7878787878","role": "admin"}]' |