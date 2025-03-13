/// <reference types="cypress" />

describe('API Tests', () => {
  it('API 1: Get All Products List', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList').then(
      (response) => {
        // Parse the response body
        const body = JSON.parse(response.body);

        // Response status code is 200
        expect(response.status).to.eq(200);
        expect(body.responseCode).to.eq(200);

        // Response contains 'products' list with all properties and it is not empty
        expect(body).to.have.property('products').and.not.be.empty;
        expect(body.products).to.be.an('array').that.is.not.empty;

        body.products.forEach((product) => {
          expect(product).to.have.property('id');
          expect(product).to.have.property('name');
          expect(product).to.have.property('price');
          expect(product).to.have.property('brand');
          expect(product).to.have.property('category');
          expect(product.category).to.have.property('usertype');
          expect(product.category.usertype).to.have.property('usertype');
          expect(product.category).to.have.property('category');
        });

        // All values in the 'products' list are of the correct type
        body.products.forEach((product) => {
          expect(product.id).to.be.a('number');
          expect(product.name).to.be.a('string');
          expect(product.price).to.be.a('string');
          expect(product.brand).to.be.a('string');
          expect(product.category).to.be.a('object');
          expect(product.category.usertype).to.be.a('object');
          expect(product.category.usertype.usertype).to.be.a('string');
          expect(product.category.category).to.be.a('string');
        });
      }
    );
  });

  it('API 2: POST To All Products List', () => {
    const product = {
      name: 'Red Top',
      price: 'Rs. 500',
      brand: 'Polo',
      category: {
        usertype: {
          usertype: 'Women',
        },
        category: 'Tops',
      },
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/productsList',
      body: product,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Response status code is 405
      expect(response.body.responseCode).to.eq(405);
      // Response message is "This request method is not supported."
      expect(response.body.message).to.equal(
        'This request method is not supported.'
      );
    });
  });

  it('API 3: Get All Brands List', () => {
    cy.request('GET', 'https://automationexercise.com/api/brandsList').then(
      (response) => {
        // Parse the response body
        const body = JSON.parse(response.body);

        // Response status code is 200
        expect(response.status).to.eq(200);
        expect(body.responseCode).to.eq(200);

        // Response contains 'brands' list with all properties and it is not empty
        expect(body).to.have.property('brands').and.not.be.empty;
        expect(body.brands).to.be.an('array').that.is.not.empty;

        body.brands.forEach((brand) => {
          expect(brand).to.have.property('id');
          expect(brand).to.have.property('brand');
        });

        // All values in the 'brands' list are of the correct type
        body.brands.forEach((brand) => {
          expect(brand.id).to.be.a('number');
          expect(brand.brand).to.be.a('string');
        });
      }
    );
  });

  it('API 4: PUT To All Brands List', () => {
    const brand = {
      brand: 'Polo',
    };

    cy.request({
      method: 'PUT',
      url: 'https://automationexercise.com/api/brandsList',
      body: brand,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Response status code is 405
      expect(response.body.responseCode).to.eq(405);
      // Response message is "This request method is not supported."
      expect(response.body.message).to.equal(
        'This request method is not supported.'
      );
    });
  });

  it('API 5: POST To Search Product', () => {
    const product = {
      search_product: 'Blue Top',
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/searchProduct',
      form: true,
      body: product,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 200
      expect(body.responseCode).to.eq(200);
      // Response contains 'products' list with all properties and it is not empty
      expect(body).to.have.property('products').and.not.be.empty;
      expect(body.products).to.be.an('array').that.is.not.empty;

      body.products.forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name').contains('Blue Top');
        expect(product).to.have.property('price');
        expect(product).to.have.property('brand');
        expect(product).to.have.property('category');
        expect(product.category).to.have.property('usertype');
        expect(product.category.usertype).to.have.property('usertype');
        expect(product.category).to.have.property('category');
      });

      // All values in the 'products' list are of the correct type
      body.products.forEach((product) => {
        expect(product.id).to.be.a('number');
        expect(product.name).to.be.a('string');
        expect(product.price).to.be.a('string');
        expect(product.brand).to.be.a('string');
        expect(product.category).to.be.a('object');
        expect(product.category.usertype).to.be.a('object');
        expect(product.category.usertype.usertype).to.be.a('string');
        expect(product.category.category).to.be.a('string');
      });
    });
  });

  it('API 6: POST To Search Product without search_product parameter', () => {
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/searchProduct',
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 400
      expect(body.responseCode).to.eq(400);
      // Response message is "Bad request, search_product parameter is missing in POST request."
      expect(body.message).to.equal(
        'Bad request, search_product parameter is missing in POST request.'
      );
    });
  });

  it('API 11: POST To Create/Register User Account', () => {
    const user = {
      name: 'Tomas',
      email: 'tomastest@gmail.com',
      password: 'Password123',
      title: 'Mr',
      birth_date: '01-01-2000',
      birth_month: '01',
      birth_year: '2000',
      firstname: 'Tomas',
      lastname: 'Tomas',
      company: 'Automation Exercise',
      address1: 'Test Address',
      address2: 'Test Address 2',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobile_number: '1234567890',
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 201
      expect(body.responseCode).to.eq(201);
      // Response message is "User created successfully!"
      expect(body.message).to.equal('User created!');
    });
  });

  it('API 13: PUT To Update User Account', () => {
    const user = {
      name: 'Tomas',
      email: 'tomastest@gmail.com',
      password: 'Password123',
      title: 'Mr',
      birth_date: '01-01-2000',
      birth_month: '01',
      birth_year: '2001',
      firstname: 'Tomas',
      lastname: 'Tomas',
      company: 'Automation Exercise',
      address1: 'Test Address',
      address2: 'Test Address 2',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobile_number: '1234567890',
    };

    cy.request({
      method: 'PUT',
      url: 'https://automationexercise.com/api/updateAccount',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 200
      expect(body.responseCode).to.eq(200);
      // Response message is "User updated!"
      expect(body.message).to.equal('User updated!');
    });
  });
  it('API 7: POST To Verify Login with valid details', () => {
    const user = {
      email: 'tomastest@gmail.com',
      password: 'Password123',
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 200
      expect(body.responseCode).to.eq(200);
      // Response message is "User exists!"
      expect(body.message).to.equal('User exists!');
    });
  });

  it('API 8: POST To Verify Login without email parameter', () => {
    const user = {
      password: 'Password123',
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 400
      expect(body.responseCode).to.eq(400);
      // Response message is "Bad request, email or password parameter is missing in POST request."
      expect(body.message).to.equal(
        'Bad request, email or password parameter is missing in POST request.'
      );
    });
  });

  it('API 9: DELETE To Verify Login', () => {
    const user = {
      email: 'tomastest@gmail.com',
    };

    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 200
      expect(body.responseCode).to.eq(405);
      // Response message is "This request method is not supported."
      expect(body.message).to.equal('This request method is not supported.');
    });
  });

  it('API 10: POST To Verify Login with invalid details', () => {
    const user = {
      email: 'tomastest@gmail.com',
      password: 'Password1234',
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 400
      expect(body.responseCode).to.eq(404);
      // Response message is "User not found!"
      expect(body.message).to.equal('User not found!');
    });
  });

  it('API 14: GET user account detail by email', () => {
    const user = {
      email: 'tomastest@gmail.com',
    };

    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/getUserDetailByEmail',
      qs: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 200
      expect(body.responseCode).to.eq(200);

      // Response contains 'user' object with all properties and it is not empty
      expect(body).to.have.property('user').and.not.be.empty;
      expect(body.user).to.be.an('object').that.is.not.empty;

      expect(body).to.have.property('user').and.not.empty;
      expect(body.user).to.be.an('object').and.not.empty;
      expect(body.user).to.have.property('id');
      expect(body.user).to.have.property('name');
      expect(body.user).to.have.property('email');
      expect(body.user).to.have.property('title');
      expect(body.user).to.have.property('birth_day');
      expect(body.user).to.have.property('birth_month');
      expect(body.user).to.have.property('birth_year');
      expect(body.user).to.have.property('first_name');
      expect(body.user).to.have.property('last_name');
      expect(body.user).to.have.property('company');
      expect(body.user).to.have.property('address1');
      expect(body.user).to.have.property('address2');
      expect(body.user).to.have.property('country');
      expect(body.user).to.have.property('state');
      expect(body.user).to.have.property('city');
      expect(body.user).to.have.property('zipcode');

      // All values in the 'user' object are of the correct type
      expect(body.user.id).to.be.a('number');
      expect(body.user.name).to.be.a('string');
      expect(body.user.email).to.be.a('string');
      expect(body.user.title).to.be.a('string');
      expect(body.user.birth_day).to.be.a('string');
      expect(body.user.birth_month).to.be.a('string');
      expect(body.user.birth_year).to.be.a('string');
      expect(body.user.first_name).to.be.a('string');
      expect(body.user.last_name).to.be.a('string');
      expect(body.user.company).to.be.a('string');
      expect(body.user.address1).to.be.a('string');
      expect(body.user.address2).to.be.a('string');
      expect(body.user.country).to.be.a('string');
      expect(body.user.state).to.be.a('string');
      expect(body.user.city).to.be.a('string');
      expect(body.user.zipcode).to.be.a('string');
    });
  });

  it('API 12: DELETE METHOD To Delete User Account', () => {
    const user = {
      email: 'tomastest@gmail.com',
      password: 'Password123',
    };

    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/deleteAccount',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: user,
    }).then((response) => {
      // Parse the response body
      const body = JSON.parse(response.body);

      expect(response.status).to.eq(200);
      // Response status code is 200
      expect(body.responseCode).to.eq(200);
      // Response message is "Account deleted!"
      expect(body.message).to.equal('Account deleted!');
    });
  });
});

/*
API 1: Get All Products List
API URL: https://automationexercise.com/api/productsList
Request Method: GET
Response Code: 200
Response JSON: All products list

API 2: POST To All Products List
API URL: https://automationexercise.com/api/productsList
Request Method: POST
Response Code: 405
Response Message: This request method is not supported.

API 3: Get All Brands List
API URL: https://automationexercise.com/api/brandsList
Request Method: GET
Response Code: 200
Response JSON: All brands list

API 4: PUT To All Brands List
API URL: https://automationexercise.com/api/brandsList
Request Method: PUT
Response Code: 405
Response Message: This request method is not supported.

API 5: POST To Search Product
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Request Parameter: search_product (For example: top, tshirt, jean)
Response Code: 200
Response JSON: Searched products list

API 6: POST To Search Product without search_product parameter
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Response Code: 400
Response Message: Bad request, search_product parameter is missing in POST request.

API 7: POST To Verify Login with valid details
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameters: email, password
Response Code: 200
Response Message: User exists!

API 8: POST To Verify Login without email parameter
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameter: password
Response Code: 400
Response Message: Bad request, email or password parameter is missing in POST request.

API 9: DELETE To Verify Login
API URL: https://automationexercise.com/api/verifyLogin
Request Method: DELETE
Response Code: 405
Response Message: This request method is not supported.

API 10: POST To Verify Login with invalid details
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameters: email, password (invalid values)
Response Code: 404
Response Message: User not found!

API 11: POST To Create/Register User Account
API URL: https://automationexercise.com/api/createAccount
Request Method: POST
Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
Response Code: 201
Response Message: User created!

API 12: DELETE METHOD To Delete User Account
API URL: https://automationexercise.com/api/deleteAccount
Request Method: DELETE
Request Parameters: email, password
Response Code: 200
Response Message: Account deleted!

API 13: PUT METHOD To Update User Account
API URL: https://automationexercise.com/api/updateAccount
Request Method: PUT
Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
Response Code: 200
Response Message: User updated!

API 14: GET user account detail by email
API URL: https://automationexercise.com/api/getUserDetailByEmail
Request Method: GET
Request Parameters: email
Response Code: 200
Response JSON: User Detail
*/
