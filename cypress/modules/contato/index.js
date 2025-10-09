
import userData from '../../fixtures/example.json';
var Chance = require('chance');
var chance = new Chance();

class Contato {
    navegarParaContato() {
        cy.get('a[href*=contact]').click();
    }

    preencherFormularioContato() {
        cy.get('[data-qa="name"]').type(chance.string());
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type(chance.string());
        cy.get('[data-qa="message"]').type(chance.string());
        cy.fixture('exercicio01.json').as('arquivo');
        cy.get('[name="upload_file"]').selectFile('@arquivo');
    }

    submeterFormularioContato() {
        cy.get('[data-qa="submit-button"]').click();
    }

    verificarEnvioComSucesso() {
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    }
}

export default new Contato();
