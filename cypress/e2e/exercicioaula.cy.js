/// <reference types="cypress" />
import userData from "../fixtures/exercicio01.json"

describe('Exercicio aula', () => {
    it('Contact us', () => {
        cy.visit('https://automationexercise.com/')

        cy.get('a[href*=contact]').click()
        
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type(userData.message)
       
        //cy.get('[name="upload_file"]').selectFile('C:\\Users\\crisc\\ProjetoPos\\pgats-02-prog-web\\cypress\\screenshots\\specs.cy.js\\Cadastrar entradas e saídas com bugs -- Cadastrar uma nova transação de entrada - falha 1 (failed).png');
        cy.fixture('exercicio01.json').as('arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')
       
        cy.get('[data-qa="submit-button"]').click()
       
       cy.get('.status').should('be.visible')
       cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')
    
    })
})