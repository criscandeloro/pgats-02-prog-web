
var Chance = require('chance');
var chance = new Chance();

class Cadastro {
    preencherFormularioNovoUsuario(nome, email) {
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button', 'Signup').click();
    }

    preencherFormularioCadastro() {
        cy.get('input[type=radio]').check('Mrs');
        cy.get('input#password').type('12345', { log: false });
        cy.get('[data-qa=days]').select('20');
        cy.get('[data-qa=months]').select('September');
        cy.get('[data-qa=years]').select('1992');
        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();
        cy.get('input#first_name').type(chance.first());
        cy.get('input#last_name').type(chance.last());
        cy.get('input#company').type(chance.company());
        cy.get('input#address1').type(chance.address());
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('California');
        cy.get('input#city').type('Los Angeles');
        cy.get('[data-qa="zipcode"]').type('901001');
        cy.get('[data-qa="mobile_number"]').type(chance.phone());
    }

    submeterCadastro() {
        cy.get('[data-qa="create-account"]').click();
    }

    verificarCadastroComSucesso() {
        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!');
    }

    verificarUsuarioExistente() {
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
    }
}

export default new Cadastro();
