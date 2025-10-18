
import userData from "../fixtures/example.json"
const { log } = require("console");
var Chance = require('chance');
var chance = new Chance();


describe('Exercicios da Aula', () => {
  beforeEach(() => {

   cy.viewport('iphone-xr')
      
   cy.visit('https://automationexercise.com/')
  })

 
  it('8-Verificar todos os produtos e a página de produtos - detalhe', () => {

     //Clicar no botão para abrir a página de produtos
   cy.get('a[href="/products"]').click()

    //cy.get('.shop-menu > .nav > :nth-child(2) > a').should('be.visible')
    cy.get('.title').should('contain', 'All Products')

    cy.get('a[href="/product_details/1"]').click()

    //product name, category, price, availability, condition, brand
    //Assert
    cy.get('.product-information > h2').should('contain', 'Blue Top')
    cy.get('.product-information > p').should('contain', 'Category: Women > Tops')
    cy.get(':nth-child(5) > span').should('contain', 'Rs. 500')
    cy.get('.product-information > p').should('contain', 'Availability: In Stock')
    cy.get('.product-information > p').should('contain', 'Condition: New')
    cy.get('.product-information').should('contain', 'Brand: Polo');
    
 //   cy.get('.product-information').then(($div) => {
  //const text = $div.text();
  //cy.log('Texto encontrado dentro de .product-information:', text);
})

it('9-Procurar produtos', () => {

   //Clicar no botão para abrir a página de produtos
   cy.get('a[href="/products"]').click()

    //cy.get('.shop-menu > .nav > :nth-child(2) > a').should('be.visible')
    cy.get('.title').should('contain', 'All Products')

    cy.get('input[id="search_product"]').type('Frozen')
    cy.get('button[id="submit_search"]').click()
    cy.get('.title').should('contain','Searched Products')
    cy.get('.productinfo > p').should('contain','Frozen Tops For Kids')

})

it('10- Verificar subscrition no footer da página', () => {

  cy.get('footer').scrollIntoView();
  cy.get('.single-widget > h2').should('be.visible')
  cy.get('#susbscribe_email').type('teste@teste.com.br')
  cy.get('button[id="subscribe"]').click()
  cy.get('div[class="alert-success alert"]').should('be.visible').contains('You have been successfully subscribed!')


    
})

it('15- Place Order: Register before Checkout', () => {
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="signup-name"]').type(chance.name());
    cy.get('[data-qa="signup-email"]').type(chance.email());
    cy.get('[data-qa="signup-button"]').click();
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(chance.string({ length: 10 }));
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1990');
    cy.get('[data-qa="first_name"]').type(chance.first());
    cy.get('[data-qa="last_name"]').type(chance.last());
    cy.get('[data-qa="company"]').type(chance.company());
    cy.get('[data-qa="address"]').type(chance.address());
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type(chance.state());
    cy.get('[data-qa="city"]').type(chance.city());
    cy.get('[data-qa="zipcode"]').type(chance.zip());
    cy.get('[data-qa="mobile_number"]').type(chance.phone());
    cy.get('[data-qa="create-account"]').click();
    cy.get('b').should('contain.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
    cy.get(':nth-child(10) > a').should('be.visible');
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click({force: true});
    cy.get('.modal-footer > .btn').click();
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('.col-sm-6 > .btn').click();
    cy.get('.form-control').type('Test order');
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(chance.name());
    cy.get('[data-qa="card-number"]').type(chance.cc());
    cy.get('[data-qa="cvc"]').type(chance.natural({ min: 100, max: 999 }));
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');
    cy.get('a[href="/delete_account"]').click();
    cy.get('b').should('contain.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
});
 
it('16- Place Order: Login before Checkout', () => {
    // --- Step 1: Create a new user for this test ---
    const user = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string({ length: 10 }),
        firstName: chance.first(),
        lastName: chance.last(),
        company: chance.company(),
        address: chance.address(),
        state: chance.state(),
        city: chance.city(),
        zipcode: chance.zip(),
        phone: chance.phone()
    };

    // --- Step 2: Register the user through the UI ---
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1990');
    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.phone);
    cy.get('[data-qa="create-account"]').click();
    cy.get('b').should('contain.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();

    // --- Step 3: Log out to ensure a clean login session ---
    cy.get('a[href="/logout"]').click();

    // --- Step 4: Log in as the newly created user ---
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();
    cy.get(':nth-child(10) > a').should('contain.text', `Logged in as ${user.name}`);

    // --- Step 5: Continue with the original test flow ---
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click({force: true});
    cy.get('.modal-footer > .btn').click();
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('.col-sm-6 > .btn').click();
    cy.get('.form-control').type('Test order');
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type(chance.cc());
    cy.get('[data-qa="cvc"]').type(chance.natural({ min: 100, max: 999 }));
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

    // --- Step 6: Delete the account to clean up ---
    cy.get('a[href="/delete_account"]').click();
    cy.get('b').should('contain.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
});

})
