Feature: Console demo

  Scenario: Run a single step execution
    Given I logged in
    When I click define a new person
    Then I receive a success message
