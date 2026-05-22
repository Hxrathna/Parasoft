Feature: Parabank Sign Up and Login
  As a new customer
  I want to register and log in to ParaBank
  So that I can verify the account balance after a successful login

  Scenario: Register a new customer and verify login balance
    Given I open the Parabank registration page
    When I register a new customer with valid details
    Then I should be able to sign in with the newly created account
    And I should see the account balance on the dashboard
