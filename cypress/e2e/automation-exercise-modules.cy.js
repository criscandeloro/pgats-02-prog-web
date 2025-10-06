

/// <reference types="cypress" />

import userData from "../fixtures/example.json"
import menu from "../modules/menu"
import login from "../modules/login";
import { getRandomEmail, getRandomNumber } from "../support/helpers";
var Chance = require('chance');
var chance = new Chance();


const { log } = require("console");


describe('Automation Exercise', () => {
  beforeEach(() => {

    cy.viewport('iphone-6')
      
    //abrir o site
    cy.visit('https://automationexercise.com/')

    //Clicar no botão para criar um novo usuário
     menu.navegarParaLogin()

  })

  it.skip('Log',()=> {
    cy.log(getRandomNumber())
    cy.log(getRandomEmail())
    cy.log(chance.address())
   
  })

  
  it('Cadastrar um usuário', () => {

    const timeStamp = new Date().getTime();
  
    //abre o link para informar os dados do novo usuário
    //cy.get('[data-qa="signup-name"]').type('QA tester')
    cy.get('[data-qa="signup-name"]').type(chance.name())

    //cy.get('[data-qa="signup-email"]').type( `qa-tester-${timeStamp}@teste.com `)
    cy.get('[data-qa="signup-email"]').type( `qa-tester-${chance.integer()}@teste.com `)
   // cy.get('[data-qa="signup-button"]').click()
   cy.contains('button','Signup').click()

   //Tela de cadastro

   //cy.get('#id_gender1').check()
   cy.get('input[type=radio]').check('Mrs')
   //cy.get('input[type=password]').type('12345')
   cy.get('input#password').type('12345', {log:false})

   //para combobox e selectors
   cy.get('[data-qa=days]').select('20')
   cy.get('[data-qa=months]').select('September')
   cy.get('[data-qa=years]').select('1992')

   //radio button e checkboxs
   cy.get('input[type=checkbox]#newsletter').check()
   cy.get('input[type=checkbox]#optin').check()

   cy.get('input#first_name').type('Bob')
   cy.get('input#last_name').type('Narciso Pipoca')
   cy.get('input#company').type('PGATS')

   //Endereço
   cy.get('input#address1').type('Avenida Selenium, nr 2004')
   //cy.get('input#address2').type('QA address 2')
   cy.get('select#country').select('Canada')
   cy.get('input#state').type('California') 
   cy.get('input#city').type('Los Angeles')
   cy.get('[data-qa="zipcode"]').type('901001')
   cy.get('[data-qa="mobile_number"]').type('111 222 333')

   //Create account button 
   cy.get('[data-qa="create-account"]').click()

   //Tripo A - Arrange, Act, Assert
   cy.url().should('includes','account_created')
   cy.contains('b', 'Account Created!')

   //consulta ao banco a api
   cy.log(userData.email)
   cy.log(userData.name)

   

})

  it.only('Login de um usuário válido', () => {
    
   //abre o link para informar os dados do login do usuário
    //cy.get('[data-qa="login-email"]').type('qa-tester-1759531270241@teste.com')
    //cy.get('[data-qa="login-password"]').type(`12345`)
    //cy.get('[data-qa="login-button"]').click()

    login.preencherFormularioDeLogin(userData.email,userData.password)

  cy.get(':nth-child(10) > a')
  .should('be.visible')
  .and('contain.text','Logged in as QA tester')   
  })

   it('Login de um usuário inválido', () => {
  
   //abre o link para informar os dados do login do usuário
    //cy.get('[data-qa="login-email"]').type('qa-tester-1759531270241@teste.com')
    //cy.get('[data-qa="login-password"]').type(`123456`)
    //cy.get('[data-qa="login-button"]').click()
    login.preencherFormularioDeLogin(userData.email,'321456')

    //Assert
    cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
   })

    it('Logout', () => {

   //abre o link para informar os dados do login do usuário
    cy.get('[data-qa="login-email"]').type('qa-tester-1759531270241@teste.com')
    cy.get('[data-qa="login-password"]').type(`12345`)
    cy.get('[data-qa="login-button"]').click()

    //Logout
    //cy.get('a[href="/logout"]').should('be.visible').click()
    menu.efetuarLogout()

    //Assert
    cy.url().should('includes','login')
    cy.contains('Login to your account')
   

     cy.get('a[href="/logout"]').should('not.exist')
     cy.get('a[href="/login"]').should('be.visible').contains('Signup / Login')

   })


    it('Cadastrar um usuário jã existente', () => {

    //abre o link para informar os dados do usuário já existente
    cy.get('[data-qa="signup-name"]').type('QA tester')
    cy.get('[data-qa="signup-email"]').type( `qa-tester-1759531270241@teste.com `)
    cy.contains('button','Signup').click()

  })

   it('Contact us', () => {

        cy.get('a[href*=contact]').click()
        
      //  cy.get('[data-qa="name"]').type(userData.name)
      //  cy.get('[data-qa="email"]').type(userData.email)
     //   cy.get('[data-qa="subject"]').type(userData.subject)
     //   cy.get('[data-qa="message"]').type(userData.message)

        cy.get('[data-qa="name"]').type(chance.string())
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(chance.string())
        cy.get('[data-qa="message"]').type(chance.string())
       
       
        //cy.get('[name="upload_file"]').selectFile('C:\\Users\\crisc\\ProjetoPos\\pgats-02-prog-web\\cypress\\screenshots\\specs.cy.js\\Cadastrar entradas e saídas com bugs -- Cadastrar uma nova transação de entrada - falha 1 (failed).png');
        cy.fixture('exercicio01.json').as('arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')
       
        cy.get('[data-qa="submit-button"]').click()
       
       cy.get('.status').should('be.visible')
       cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')
    
    })

  
})
  