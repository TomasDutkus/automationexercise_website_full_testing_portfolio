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

    // Login with existing user and delete the account
    cy.get('input[data-qa="login-email"]').click().type('tomastest@gmail.com');
    cy.get('input[data-qa="login-password"]').click().type('Password123');
    cy.get('button[data-qa="login-button"]').click();
    cy.contains('Delete Account').click();
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

    // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
    cy.get('.product-information').should('be.visible');
    cy.get('h2').contains('Blue Top').should('be.visible');
    cy.get('p').contains('Category').should('be.visible');
    cy.get('span').contains('Rs. 500').should('be.visible');
    cy.get('p').contains('Availability').should('be.visible');
    cy.get('p').contains('Condition').should('be.visible');
    cy.get('p').contains('Brand').should('be.visible');
  });

  it('Test Case 9: Search Product', () => {
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

    // 6. Enter product name in search input and click search button
    cy.get('#search_product').click().type('Blue Top');
    cy.get('#submit_search').click();

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    cy.contains('Searched Products').should('be.visible');

    // 8. Verify all the products related to search are visible
    cy.get('.features_items').should('be.visible');
    cy.get('p').contains('Blue Top').should('be.visible');
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Scroll down to footer
    cy.get('#footer').scrollIntoView();

    // 5. Verify text 'SUBSCRIPTION'
    cy.contains('Subscription').should('be.visible');

    // 6. Enter email address in input and click arrow button
    cy.get('#susbscribe_email').click().type('tomastest@gmail.com');
    cy.get('#subscribe').click();

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('Test Case 11: Verify Subscription in Cart page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click 'Cart' button
    cy.get('ul.navbar-nav li').contains('Cart').click();

    // 5. Scroll down to footer
    cy.get('#footer').scrollIntoView();

    // 6. Verify text 'SUBSCRIPTION'
    cy.contains('Subscription').should('be.visible');

    // 7. Enter email address in input and click arrow button
    cy.get('input#susbscribe_email').click().type('tomastest@gmail.com');
    cy.get('button#subscribe').click();

    // 8. Verify success message 'You have been successfully subscribed!' is visible
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('Test Case 12: Add Products in Cart', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click 'Products' button
    cy.get('ul.navbar-nav li').contains('Products').click();

    // 5. Hover over first product and click 'Add to cart'
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 6. Click 'Continue Shopping' button
    cy.wait(2000);
    cy.get('button.btn-success').contains('Continue Shopping').click();

    // 7. Hover over second product and click 'Add to cart'
    cy.get('a[data-product-id="2"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 8. Click 'View Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 9. Verify both products are added to Cart
    cy.get('tbody tr#product-1').should('be.visible');
    cy.get('tbody tr#product-2').should('be.visible');

    // 10. Verify their prices, quantity and total price
    cy.get('tbody tr#product-1 td.cart_price').contains('Rs. 500');
    cy.get('tbody tr#product-1 td.cart_quantity').contains('1');
    cy.get('tbody tr#product-1 td.cart_total').contains('Rs. 500');

    cy.get('tbody tr#product-2 td.cart_price').contains('Rs. 400');
    cy.get('tbody tr#product-2 td.cart_quantity').contains('1');
    cy.get('tbody tr#product-2 td.cart_total').contains('Rs. 400');
  });

  it('Test Case 13: Verify Product quantity in Cart', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click 'View Product' for any product on home page
    cy.get('a[href="/product_details/1"]').click();

    // 5. Verify product detail is opened
    cy.url().should('eq', 'https://automationexercise.com/product_details/1');

    // 6. Increase quantity to 4
    cy.get('input#quantity').clear().type('4');

    // 7. Click 'Add to cart' button
    cy.get('button.btn.btn-default.cart').click();

    // 8. Click 'View Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 9. Verify that product is displayed in cart page with exact quantity
    cy.get('tbody tr#product-1 td.cart_quantity').contains('4');
  });

  it('Test Case 14: Place Order: Register while Checkout', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click 'Products' button
    cy.get('ul.navbar-nav li').contains('Products').click();

    // 5. Hover over first product and click 'Add to cart'
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 6. Click 'View Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 7. Click 'Proceed To Checkout' button
    cy.get('a').contains('Proceed To Checkout').click();

    // 8. Click 'Register / Login' button
    cy.get('a').contains('Register / Login').click();

    // 9. Fill all details in Signup and create account
    createUser();

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 11. Verify ' Logged in as username' at top
    // This is already verified in createUser function

    // 12. Click 'Cart' button
    cy.get('ul.navbar-nav li').contains('Cart').click();

    // 13. Click 'Proceed To Checkout' button
    cy.get('a').contains('Proceed To Checkout').click();

    // 14. Verify Address Details and Review Your Order
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // 15. Enter description in comment text area and click 'Place Order'
    cy.get('textarea.form-control').click().type('Test Comment');
    cy.get('a').contains('Place Order').click();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.get('input[data-qa="name-on-card"]').click().type('Tomas Test');
    cy.get('input[data-qa="card-number"]').click().type('1234567890123456');
    cy.get('input[data-qa="cvc"]').click().type('123');
    cy.get('input[data-qa="expiry-month"]').click().type('10');
    cy.get('input[data-qa="expiry-year"]').click().type('2028');

    // 17. Click 'Pay and Confirm Order' button
    cy.get('button[data-qa="pay-button"]').click();

    // 18. Verify success message 'Your order has been placed successfully!'
    cy.contains('Congratulations! Your order has been confirmed!').should(
      'be.visible'
    );

    // 19. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    createUser();

    // 8. Add products to cart
    cy.get('ul.navbar-nav li').contains('Products').click();
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 9. Click 'Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 10. Verify that cart page is displayed
    cy.url().should('eq', 'https://automationexercise.com/view_cart');

    // 11. Click Proceed To Checkout
    cy.get('a').contains('Proceed To Checkout').click();

    // 12. Verify Address Details and Review Your Order
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // 13. Enter description in comment text area and click 'Place Order'
    cy.get('textarea.form-control').click().type('Test Comment');
    cy.get('a').contains('Place Order').click();

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.get('input[data-qa="name-on-card"]').click().type('Tomas Test');
    cy.get('input[data-qa="card-number"]').click().type('1234567890123456');
    cy.get('input[data-qa="cvc"]').click().type('123');
    cy.get('input[data-qa="expiry-month"]').click().type('10');
    cy.get('input[data-qa="expiry-year"]').click().type('2028');

    // 15. Click 'Pay and Confirm Order' button
    cy.get('button[data-qa="pay-button"]').click();

    // 16. Verify success message 'Your order has been placed successfully!'
    cy.contains('Congratulations! Your order has been confirmed!').should(
      'be.visible'
    );

    // 17. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });

  it('Test Case 16: Place Order: Login before Checkout', () => {
    const user = createUser();
    logout();

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Click 'Signup / Login' button
    cy.get('a').contains('Signup / Login').click();

    // 5. Fill email, password and click 'Login' button
    cy.get('input[data-qa="login-email"]').click().type(user.email);
    cy.get('input[data-qa="login-password"]').click().type(user.password);
    cy.get('button[data-qa="login-button"]').click();

    // 6. Verify 'Logged in as username' at top
    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    // 7. Add products to cart
    cy.get('ul.navbar-nav li').contains('Products').click();
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 8. Click 'Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 9. Verify that cart page is displayed
    cy.url().should('eq', 'https://automationexercise.com/view_cart');

    // 10. Click Proceed To Checkout
    cy.get('a').contains('Proceed To Checkout').click();

    // 11. Verify Address Details and Review Your Order
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // 12. Enter description in comment text area and click 'Place Order'
    cy.get('textarea.form-control').click().type('Test Comment');
    cy.get('a').contains('Place Order').click();

    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.get('input[data-qa="name-on-card"]').click().type('Tomas Test');
    cy.get('input[data-qa="card-number"]').click().type('1234567890123456');
    cy.get('input[data-qa="cvc"]').click().type('123');
    cy.get('input[data-qa="expiry-month"]').click().type('10');
    cy.get('input[data-qa="expiry-year"]').click().type('2028');

    // 14. Click 'Pay and Confirm Order' button
    cy.get('button[data-qa="pay-button"]').click();

    // 15. Verify success message 'Your order has been placed successfully!'
    cy.contains('Congratulations! Your order has been confirmed!').should(
      'be.visible'
    );

    // 16. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });

  it('Test Case 17: Remove Products From Cart', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Add products to cart
    cy.get('ul.navbar-nav li').contains('Products').click();
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 5. Click 'Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 6. Verify that cart page is displayed
    cy.url().should('eq', 'https://automationexercise.com/view_cart');

    // 7. Click 'X' button corresponding to particular product
    cy.get('a[data-product-id="1"]').trigger('mouseover').click();

    // 8. Verify that product is removed from the cart
    cy.get('a[data-product-id="1"]').should('not.exist');
  });

  it('Test Case 18: View Category Products', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that categories are visible on left side bar
    cy.get('div.left-sidebar').contains('Category').should('be.visible');

    // 4. Click on 'Women' category
    cy.get('div.left-sidebar').contains('Women').click();

    // 5. Click on any category link under 'Women' category, for example: Dress
    cy.get('div.left-sidebar').contains('Dress').click();

    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS DRESS PRODUCTS'
    cy.url().should('eq', 'https://automationexercise.com/category_products/1');
    cy.contains('Women - Dress Products').should('be.visible');

    // 7. On left side bar, click on any sub-category link of 'Men' category
    cy.get('div.left-sidebar').contains('Men').click();
    cy.get('div.left-sidebar').contains('Jeans').click();

    // 8. Verify that user is navigated to that category page
    cy.url().should('eq', 'https://automationexercise.com/category_products/6');
    cy.contains('Men - Jeans Products').should('be.visible');
  });

  it('Test Case 19: View & Cart Brand Products', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Click on 'Products' button
    cy.get('ul.navbar-nav li').contains('Products').click();

    // 4. Verify that Brands are visible on left side bar
    cy.get('div.left-sidebar').contains('Brands').should('be.visible');

    // 5. Click on any brand name
    cy.get('div.left-sidebar').contains('Polo').click();

    // 6. Verify that user is navigated to brand page and brand products are displayed
    cy.url().should('eq', 'https://automationexercise.com/brand_products/Polo');
    cy.contains('Polo').should('be.visible');

    // 7. On left side bar, click on any other brand link
    cy.get('div.left-sidebar').contains('H&M').click();

    // 8. Verify that user is navigated to that brand page and can see products
    cy.url().should('eq', 'https://automationexercise.com/brand_products/H&M');
    cy.contains('H&M').should('be.visible');
  });

  it('Test Case 20: Search Products and Verify Cart After Login', () => {
    const user = createUser();
    logout();
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Click on 'Products' button
    cy.get('ul.navbar-nav li').contains('Products').click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    cy.url().should('eq', 'https://automationexercise.com/products');

    // 5. Enter product name in search input and click search button
    cy.get('input#search_product').type('jeans');
    cy.get('button#submit_search').click();

    // 6. Verify 'SEARCHED PRODUCTS' is visible
    cy.contains('Searched Products').should('be.visible');

    // 7. Verify all the products related to search are visible
    cy.get('.productinfo').each(($el) => {
      cy.wrap($el).should('contain', 'Jeans').and('is.visible');
    });

    // 8. Add those products to cart
    cy.get('.productinfo').each(($el) => {
      cy.wrap($el).find('a.btn.btn-default.add-to-cart').first().click();
      cy.get('button[data-dismiss="modal"]').click();
    });

    // 9. Click 'Cart' button and verify that products are visible in cart
    cy.get('ul.navbar-nav li').contains('Cart').click();
    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).should('contain', 'Jeans').and('is.visible');
    });

    // 10. Click 'Signup / Login' button and submit login details
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();
    cy.get('input[data-qa="login-email"]').type(user.email);
    cy.get('input[data-qa="login-password"]').type(user.password);
    cy.get('button[data-qa="login-button"]').click();

    // 11. Again, go to Cart page
    cy.get('ul.navbar-nav li').contains('Cart').click();

    // 12. Verify that those products are visible in cart after login as well
    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).should('contain', 'Jeans').and('is.visible');
    });

    // Delete user
    cy.get('ul.navbar-nav li').contains('Delete Account').click();
  });

  it('Test Case 21: Add review on product', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Click on 'Products' button
    cy.get('ul.navbar-nav li').contains('Products').click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    cy.url().should('eq', 'https://automationexercise.com/products');

    // 5. Click on 'View Product' button
    cy.get('a[href="/product_details/1"]').contains('View Product').click();

    // 6. Verify 'Write Your Review' is visible
    cy.contains('Write Your Review').should('be.visible');

    // 7. Enter name, email and review
    cy.get('input#name').type('Tomas');
    cy.get('input#email').type('tomastest@gmail.com');
    cy.get('textarea#review').type('Test Review');

    // 8. Click 'Submit' button
    cy.get('#button-review').click();

    // 9. Verify success message 'Thank you for your review.'
    cy.contains('Thank you for your review.').should('be.visible');
  });

  it('Test Case 22: Add to cart from Recommended items', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Scroll to bottom of page
    cy.scrollTo('bottom');

    // 4. Verify 'RECOMMENDED ITEMS' are visible
    cy.contains('recommended items').should('be.visible');

    // 5. Click on 'Add To Cart' on Recommended product
    cy.get('#recommended-item-carousel .productinfo a').first().click({
      force: true,
    });

    // 6. Click on 'View Cart' button
    cy.get('a[href="/view_cart"]').contains('View Cart').click();

    // 7. Verify that product is displayed in cart page
    cy.get('tbody tr').should('have.length', 1).and('be.visible');
  });

  it('Test Case 23: Verify address details in checkout page', () => {
    const user = createUser();

    // 8. Add products to cart
    cy.get('ul.navbar-nav li').contains('Products').click();
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 9. Click 'Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 10. Verify that cart page is displayed
    cy.url().should('eq', 'https://automationexercise.com/view_cart');

    // 11. Click Proceed To Checkout
    cy.get('a').contains('Proceed To Checkout').click();

    // 12. Verify that the delivery address is same address filled at the time registration of account
    cy.get('li.address_firstname.address_lastname')
      .eq(0)
      .should('contain', 'Mr. ' + user.name + ' ' + user.lastName);
    cy.get('li.address_address1.address_address2')
      .eq(0)
      .should('contain', user.company);
    cy.get('li.address_address1.address_address2')
      .eq(1)
      .should('contain', user.address);
    cy.get('li.address_address1.address_address2')
      .eq(2)
      .should('contain', user.address2);
    cy.get('li.address_city.address_state_name.address_postcode')
      .eq(0)
      .should(
        'contain',
        user.city + ' ' + user.state + '\n\t\t\t\t\t\t\t\t' + user.zipcode
      );
    cy.get('li.address_country_name').eq(0).should('contain', user.country);
    cy.get('li.address_phone').eq(0).should('contain', user.mobileNumber);

    // 13. Verify that the billing address is same address filled at the time registration of account
    cy.get('li.address_firstname.address_lastname')
      .eq(1)
      .should('contain', 'Mr. ' + user.name + ' ' + user.lastName);
    cy.get('li.address_address1.address_address2')
      .eq(3)
      .should('contain', user.company);
    cy.get('li.address_address1.address_address2')
      .eq(4)
      .should('contain', user.address);
    cy.get('li.address_address1.address_address2')
      .eq(5)
      .should('contain', user.address2);
    cy.get('li.address_city.address_state_name.address_postcode')
      .eq(1)
      .should(
        'contain',
        user.city + ' ' + user.state + '\n\t\t\t\t\t\t\t\t' + user.zipcode
      );
    cy.get('li.address_country_name').eq(1).should('contain', user.country);
    cy.get('li.address_phone').eq(1).should('contain', user.mobileNumber);

    // 14. Click 'Delete Account' button
    cy.get('a').contains('Delete Account').click();

    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
  });

  it('Test Case 24: Download Invoice after purchase order', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Add products to cart
    cy.get('ul.navbar-nav li').contains('Products').click();
    cy.get('a[data-product-id="1"]')
      .first()
      .trigger('mouseover')
      .contains('Add to cart')
      .click();

    // 5. Click 'Cart' button
    cy.wait(2000);
    cy.get('a[href="/view_cart"]').eq(1).click();

    // 6. Verify that cart page is displayed
    cy.url().should('eq', 'https://automationexercise.com/view_cart');

    // 7. Click Proceed To Checkout
    cy.get('a').contains('Proceed To Checkout').click();

    // 8. Click 'Register / Login' button
    // 9. Fill all details in Signup and create account
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 11. Verify ' Logged in as username' at top
    const user = createUser();

    // 12.Click 'Cart' button
    cy.get('a[href="/view_cart"]').eq(0).click();

    // 13. Click 'Proceed To Checkout' button
    cy.get('a').contains('Proceed To Checkout').click();

    // 14. Verify Address Details and Review Your Order
    cy.get('li.address_firstname.address_lastname')
      .eq(0)
      .should('contain', 'Mr. ' + user.name + ' ' + user.lastName);
    cy.get('li.address_address1.address_address2')
      .eq(0)
      .should('contain', user.company);
    cy.get('li.address_address1.address_address2')
      .eq(1)
      .should('contain', user.address);
    cy.get('li.address_address1.address_address2')
      .eq(2)
      .should('contain', user.address2);
    cy.get('li.address_city.address_state_name.address_postcode')
      .eq(0)
      .should(
        'contain',
        user.city + ' ' + user.state + '\n\t\t\t\t\t\t\t\t' + user.zipcode
      );
    cy.get('li.address_country_name').eq(0).should('contain', user.country);
    cy.get('li.address_phone').eq(0).should('contain', user.mobileNumber);
    cy.get('li.address_firstname.address_lastname')
      .eq(1)
      .should('contain', 'Mr. ' + user.name + ' ' + user.lastName);
    cy.get('li.address_address1.address_address2')
      .eq(3)
      .should('contain', user.company);
    cy.get('li.address_address1.address_address2')
      .eq(4)
      .should('contain', user.address);
    cy.get('li.address_address1.address_address2')
      .eq(5)
      .should('contain', user.address2);
    cy.get('li.address_city.address_state_name.address_postcode')
      .eq(1)
      .should(
        'contain',
        user.city + ' ' + user.state + '\n\t\t\t\t\t\t\t\t' + user.zipcode
      );
    cy.get('li.address_country_name').eq(1).should('contain', user.country);
    cy.get('li.address_phone').eq(1).should('contain', user.mobileNumber);

    cy.get('a[href="/product_details/1"]').contains('Blue Top');

    // 15. Enter description in comment text area and click 'Place Order'
    cy.get('textarea.form-control').click().type('Test Comment');
    cy.get('a').contains('Place Order').click();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.get('input[data-qa="name-on-card"]').click().type('Tomas Test');
    cy.get('input[data-qa="card-number"]').click().type('1234567890123456');
    cy.get('input[data-qa="cvc"]').click().type('123');
    cy.get('input[data-qa="expiry-month"]').click().type('10');
    cy.get('input[data-qa="expiry-year"]').click().type('2028');

    // 17. Click 'Pay and Confirm Order' button
    cy.get('button[data-qa="pay-button"]').click();

    // 18. Verify success message 'Your order has been placed successfully!'
    cy.contains('Congratulations! Your order has been confirmed!').should(
      'be.visible'
    );

    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
    cy.get('a').contains('Download Invoice').click();
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(`${downloadsFolder}/invoice.txt`).should('exist');

    // 20. Click 'Continue' button
    cy.get('a').contains('Continue').click();

    // 21. Click 'Delete Account' button
    cy.get('a').contains('Delete Account').click();

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.contains('Account Deleted!').should('be.visible');
  });

  it('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Scroll down page to bottom
    cy.scrollTo('bottom');

    // 5. Verify 'SUBSCRIPTION' is visible
    cy.contains('Subscription').should('be.visible');

    // 6. Click on arrow at bottom right side to move upward
    cy.get('i[class="fa fa-angle-up"]').click();

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    cy.contains(
      'Full-Fledged practice website for Automation Engineers'
    ).should('be.visible');
  });

  it('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // 4. Scroll down page to bottom
    cy.scrollTo('bottom');

    // 5. Verify 'SUBSCRIPTION' is visible
    cy.contains('Subscription').should('be.visible');

    // 6. Scroll up page to top
    cy.scrollTo('top');

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    cy.contains(
      'Full-Fledged practice website for Automation Engineers'
    ).should('be.visible');
  });
});
