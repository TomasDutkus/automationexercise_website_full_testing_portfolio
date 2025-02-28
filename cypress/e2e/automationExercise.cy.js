/// <reference types="cypress" />

// Test Case 1: Register User
describe('Automation Exercise', () => {
  it('Test Case 1: Register User', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Signup / Login' button
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();

    // 5. Verify 'New User Signup!' is visible
    cy.get('.signup-form').contains('New User Signup!').should('be.visible');

    // 6. Enter name and email address
    cy.get('input[data-qa="signup-name"]').click().type('Tomas');
    cy.get('input[data-qa="signup-email"]').click().type('tomastest@gmail.com');

    // 7. Click 'Signup' button
    cy.get('button[data-qa="signup-button"]').click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.contains('Enter Account Information').should('be.visible');

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    cy.get('input#id_gender1').click();
    cy.get('input[data-qa="password"]').click().type('Password123');
    cy.get('select#days').select('10');
    cy.get('select#months').select('July');
    cy.get('select#years').select('1990');

    // 10. Select checkbox 'Sign up for our newsletter!'
    cy.get('input#newsletter').click();

    // 11. Select checkbox 'Receive special offers from our partners!'
    cy.get('input#optin').click();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    cy.get('input[data-qa="first_name"]').click().type('Tomas');
    cy.get('input[data-qa="last_name"]').click().type('Test');
    cy.get('input[data-qa="company"]').click().type('Test Company');
    cy.get('input[data-qa="address"]').click().type('Test Address');
    cy.get('input[data-qa="address2"]').click().type('Test Address 2');
    cy.get('select[data-qa="country"]').select('United States');
    cy.get('input[data-qa="state"]').click().type('Test State');
    cy.get('input[data-qa="city"]').click().type('Test City');
    cy.get('input[data-qa="zipcode"]').click().type('12345');
    cy.get('input[data-qa="mobile_number"]').click().type('1234567890');

    // 13. Click 'Create Account button'
    cy.get('button[data-qa="create-account"]').click();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    cy.contains('Account Created!').should('be.visible');

    // 15. Click 'Continue' button
    cy.get('[data-qa="continue-button"]').click();

    // 16. Verify that 'Logged in as username' is visible
    cy.contains('Logged in as Tomas').should('be.visible');

    // 17. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
});
