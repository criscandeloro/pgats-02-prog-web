/// <reference types="cypress" />

import 'cypress-xpath'

describe('Automation Exercise', () => {
  beforeEach(() => {

   cy.viewport('iphone-xr')
      
    //abrir o site
   cy.visit('https://automationexercise.com/')

    //Clicar no botão para criar um novo usuário
   cy.xpath('//*[@id="header"]//ul/li[4]/a').click();


  })

    it.only('Cadastrar um usuário', () => {
   
       const timeStamp = new Date().getTime();
     
       //abre o link para informar os dados do novo usuário
             
        cy.xpath('//input[@data-qa="signup-name"]').type('QA tester');
        cy.xpath('//input[@data-qa="signup-email"]').type(`qa-tester-${timeStamp}@teste.com`)
        cy.xpath('//button[@data-qa="signup-button"]').click()


      //Tela de cadastro
   
      
      cy.get('input[type=radio]').check('Mrs')
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
  
   })

   it('Login de um usuário com e-mail e senha corretos', () => {
    
    cy.get('[data-qa="login-email"]').type('qa-tester-1759531270241@teste.com')
    cy.get('[data-qa="login-password"]').type(`12345`)
    cy.get('[data-qa="login-button"]').click()

    //Assert

    cy.get('i.fa-user').parent().should('contain', 'QA tester')
    cy.get('a[href="/logout"]').should('be.visible')
   
  })

   it('Login de um usuário com e-mail e senha incorretos', () => {
  
    cy.get('[data-qa="login-email"]').type('qa-tester-1759531270241@teste.com')
    cy.get('[data-qa="login-password"]').type(`123456`)
    cy.get('[data-qa="login-button"]').click()

    //Assert
    cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')

   })

    it('Logout do usuário', () => {

    cy.get('[data-qa="login-email"]').type('qa-tester-1759531270241@teste.com')
    cy.get('[data-qa="login-password"]').type(`12345`)
    cy.get('[data-qa="login-button"]').click()

    cy.get('i.fa-user').parent().should('contain', 'QA tester')
  
    //Act
    cy.get('a[href="/logout"]').should('be.visible').click()

    //Assert
    cy.url().should('includes','login')
    cy.contains('Login to your account')
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('be.visible').contains('Signup / Login')

   })

    it('Cadastrar Usuário com e-mail existente no sistema', () => {

    //abre o link para informar os dados do usuário já existente
    cy.get('[data-qa="signup-name"]').type('QA tester')
    cy.get('[data-qa="signup-email"]').type( `qa-tester-1759531270241@teste.com `)

    cy.contains('button','Signup').click()

    cy.get('.signup-form > form > p').should('contain','Email Address already exist!')

  })

})
