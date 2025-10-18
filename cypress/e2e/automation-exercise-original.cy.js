/// <reference types="cypress" />

import userData from "../fixtures/example.json";

describe('Automation Exercise', () => {
  const user = {};

  before(() => {
    const timeStamp = new Date().getTime();
    user.name = 'QA tester';
    user.email = `qa-tester-${timeStamp}@teste.com`;
    user.password = '12345';
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
    cy.get('input#first_name').type('Bob');
    cy.get('input#last_name').type('Narciso Pipoca');
    cy.get('input#company').type('PGATS');
    cy.get('input#address1').type('Avenida Selenium, nr 2004');
    cy.get('select#country').select('Canada');
    cy.get('input#state').type('California');
    cy.get('input#city').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('901001');
    cy.get('[data-qa="mobile_number"]').type('111 222 333');
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
    cy.get('[data-qa="login-password"]').type('wrong-password');
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
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);
    cy.fixture('exercicio01.json').as('arquivo');
    cy.get('[name="upload_file"]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
  });
});