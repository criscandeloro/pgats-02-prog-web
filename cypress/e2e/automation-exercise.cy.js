/// <reference types="cypress" />

import userData from "../fixtures/example.json";
var Chance = require('chance');
var chance = new Chance();

describe('Automation Exercise', () => {
  const user = {};

  before(() => {
    user.name = chance.name();
    user.email = `qa-tester-${chance.integer()}@teste.com`;
    user.password = '12345';
    user.firstName = chance.first();
    user.lastName = chance.last();
    user.company = chance.company();
    user.address = chance.address();
    user.state = chance.state({ full: true });
    user.city = chance.city();
    user.zipcode = chance.zip();
    user.mobile_number = chance.phone();
  });

  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.visit('https://automationexercise.com/');
  });

  it('Cadastrar um usuário', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.contains('button', 'Signup').click();

    // Tela de cadastro
    cy.get('input[type=radio]').check('Mrs');
    cy.get('input#password').type(user.password, { log: false });
    cy.get('[data-qa=days]').select('20');
    cy.get('[data-qa=months]').select('September');
    cy.get('[data-qa=years]').select('1992');
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
    cy.get('input#first_name').type(user.firstName);
    cy.get('input#last_name').type(user.lastName);
    cy.get('input#company').type(user.company);
    cy.get('input#address1').type(user.address);
    cy.get('select#country').select('Canada');
    cy.get('input#state').type(user.state);
    cy.get('input#city').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile_number);
    cy.get('[data-qa="create-account"]').click();

    // Assert
    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
  });

  it('Login de um usuário com e-mail e senha corretos', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();

    // Assert
    cy.get('i.fa-user').parent().should('contain', user.name);
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get(':nth-child(10) > a').should('be.visible').and('contain.text', `Logged in as ${user.name}`);
    cy.contains('b', user.name);
  });

  it('Login de um usuário com e-mail e senha incorretos', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(chance.string({ length: 10 }));
    cy.get('[data-qa="login-button"]').click();

    // Assert
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
  });

  it('Logout do usuário', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();
    cy.get('i.fa-user').parent().should('contain', user.name);

    // Act
    cy.get('a[href="/logout"]').should('be.visible').click();

    // Assert
    cy.url().should('includes', 'login');
    cy.contains('Login to your account');
    cy.get('a[href="/logout"]').should('not.exist');
    cy.get('a[href="/login"]').should('be.visible').contains('Signup / Login');
  });

  it('Cadastrar Usuário com e-mail existente no sistema', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.contains('button', 'Signup').click();

    // Assert
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
  });

  it('Contact us', () => {
    cy.get('a[href*=contact]').click();
    cy.get('[data-qa="name"]').type(chance.name());
    cy.get('[data-qa="email"]').type(chance.email());
    cy.get('[data-qa="subject"]').type(chance.sentence({ words: 3 }));
    cy.get('[data-qa="message"]').type(chance.paragraph());
    cy.fixture('exercicio01.json').as('arquivo');
    cy.get('[name="upload_file"]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
  });
});