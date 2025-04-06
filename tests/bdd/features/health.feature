Feature: Health Check

  Scenario: Server responds to health check
    Given the server is running
    When I request GET /api/health
    Then the response should be 200
    And the response body should contain "ok"
