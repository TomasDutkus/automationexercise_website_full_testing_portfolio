/// <reference types="cypress" />

function createUser() {
  // Generate user details
  const user = {
    name: 'Tomas',
    email: 'tomastest@gmail.com',
    password: 'Password123',
    firstName: 'Tomas',
    lastName: 'Test',
    company: 'Test Company',
    address: 'Test Address',
    address2: 'Test Address 2',
    country: 'United States',
    state: 'Test State',
    city: 'Test City',
    zipcode: '12345',
    mobileNumber: '1234567890',
  };

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
  cy.get('input[data-qa="signup-name"]').click().type(user.name);
  cy.get('input[data-qa="signup-email"]').click().type(user.email);

  // 7. Click 'Signup' button
  cy.get('button[data-qa="signup-button"]').click();

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  cy.contains('Enter Account Information').should('be.visible');

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  cy.get('input#id_gender1').click();
  cy.get('input[data-qa="password"]').click().type(user.password);
  cy.get('select#days').select('10');
  cy.get('select#months').select('July');
  cy.get('select#years').select('1990');

  // 10. Select checkbox 'Sign up for our newsletter!'
  cy.get('input#newsletter').click();

  // 11. Select checkbox 'Receive special offers from our partners!'
  cy.get('input#optin').click();

  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  cy.get('input[data-qa="first_name"]').click().type(user.firstName);
  cy.get('input[data-qa="last_name"]').click().type(user.lastName);
  cy.get('input[data-qa="company"]').click().type(user.company);
  cy.get('input[data-qa="address"]').click().type(user.address);
  cy.get('input[data-qa="address2"]').click().type(user.address2);
  cy.get('select[data-qa="country"]').select(user.country);
  cy.get('input[data-qa="state"]').click().type(user.state);
  cy.get('input[data-qa="city"]').click().type(user.city);
  cy.get('input[data-qa="zipcode"]').click().type(user.zipcode);
  cy.get('input[data-qa="mobile_number"]').click().type(user.mobileNumber);

  // 13. Click 'Create Account button'
  cy.get('button[data-qa="create-account"]').click();

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  cy.contains('Account Created!').should('be.visible');

  // 15. Click 'Continue' button
  cy.get('[data-qa="continue-button"]').click();

  // 16. Verify that 'Logged in as username' is visible
  cy.contains(`Logged in as ${user.name}`).should('be.visible');

  // Save user details in Cypress.env
  Cypress.env('user', user);

  // Return the user details
  return user;
}

function logout() {
  // Click 'Logout' button
  cy.contains('Logout').click();
}

describe('Automation Exercise', () => {
  it('Test Case 1: Register User', () => {
    // Create a user and save the details in Cypress.env
    const user = createUser();

    // 17. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    // Create a new user since the previous user was deleted
    const user = createUser();
    // Logout the user
    logout();

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Signup / Login' button
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();

    // 5. Verify 'Login to your account' is visible
    cy.get('.login-form')
      .contains('Login to your account')
      .should('be.visible');

    // 6. Enter correct email address and password
    cy.get('input[data-qa="login-email"]').click().type(user.email);
    cy.get('input[data-qa="login-password"]').click().type(user.password);

    // 7. Click 'login' button
    cy.get('button[data-qa="login-button"]').click();

    // 8. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    // 9. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    cy.contains('Account Deleted!').should('be.visible');
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Signup / Login' button
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();

    // 5. Verify 'Login to your account' is visible
    cy.get('.login-form')
      .contains('Login to your account')
      .should('be.visible');

    // 6. Enter incorrect email address and password
    cy.get('input[data-qa="login-email"]').click().type('wrongemail@gmail.com');
    cy.get('input[data-qa="login-password"]').click().type('wrongpassword');

    // 7. Click 'login' button
    cy.get('button[data-qa="login-button"]').click();

    // 8. Verify error 'Your email or password is incorrect!' is visible
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });

  it('Test Case 4: Logout User', () => {
    // Create a user and save the details in Cypress.env
    const user = createUser();

    // Logout the user
    logout();

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Signup / Login' button
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();

    // 5. Verify 'Login to your account' is visible
    cy.get('.login-form')
      .contains('Login to your account')
      .should('be.visible');

    // 6. Enter correct email address and password
    cy.get('input[data-qa="login-email"]').click().type(user.email);
    cy.get('input[data-qa="login-password"]').click().type(user.password);

    // 7. Click 'login' button
    cy.get('button[data-qa="login-button"]').click();

    // 8. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    // 9. Click 'Logout' button
    cy.contains('Logout').click();

    // 10. Verify that user is navigated to login page
    cy.get('.login-form')
      .contains('Login to your account')
      .should('be.visible');
  });

  it('Test Case 5: Register User with existing email', () => {
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

    // 6. Enter name and already registered email address
    cy.get('input[data-qa="signup-name"]').click().type('Tomas');
    cy.get('input[data-qa="signup-email"]').click().type('tomastest@gmail.com');

    // 7. Click 'Signup' button
    cy.get('button[data-qa="signup-button"]').click();

    // 8. Verify error 'Email Address already exist!' is visible
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('Test Case 6: Contact Us Form', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Contact Us' button
    cy.get('ul.navbar-nav li').contains('Contact us').click();

    // 5. Verify 'GET IN TOUCH' is visible
    cy.contains('Get In Touch').should('be.visible');

    // 6. Enter name, email, subject and message
    cy.get('input[data-qa="name"]').click().type('Tomas');
    cy.get('input[data-qa="email"]').click().type('tomastest@gmail.com');
    cy.get('input[data-qa="subject"]').click().type('Test Subject');
    cy.get('textarea[data-qa="message"]').click().type('Test Message');

    // 7. Upload file
    cy.get('input[name="upload_file"]').attachFile('example.json');

    // 8. Click 'Submit' button
    cy.get('input[data-qa="submit-button"]').click();

    // 9. Click OK button
    cy.on('window:confirm', () => true);

    // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    cy.contains(
      'Success! Your details have been submitted successfully.'
    ).should('be.visible');

    // 11. Click 'Home' button and verify that landed to home page successfully
    cy.get('a.btn-success').click();
    cy.url().should('eq', 'https://automationexercise.com/');
  });

  it('Test Case 7: Verify Test Cases Page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Test Cases' button
    cy.get('ul.navbar-nav li').contains('Test Cases').click();

    // 5. Verify user is navigated to test cases page successfully
    cy.url().should('eq', 'https://automationexercise.com/test_cases');
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click on 'Products' button
    cy.get('ul.navbar-nav li').contains('Products').click();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    cy.url().should('eq', 'https://automationexercise.com/products');
    cy.get('body').should('be.visible');

    // 6. The products list is visible
    cy.get('.features_items').should('be.visible');

    // 7. Click on 'View Product' of first product
    cy.get('a[href="/product_details/1"]').click();

    // 8. User is landed to product detail page
    cy.url().should('eq', 'https://automationexercise.com/product_details/1');

    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    cy.get('.product-information').should('be.visible');
    cy.get('h2').contains('Blue Top').should('be.visible');
    cy.get('p').contains('Category').should('be.visible');
    cy.get('span').contains('Rs. 500').should('be.visible');
    cy.get('p').contains('Availability').should('be.visible');
    cy.get('p').contains('Condition').should('be.visible');
    cy.get('p').contains('Brand').should('be.visible');
  });
});
