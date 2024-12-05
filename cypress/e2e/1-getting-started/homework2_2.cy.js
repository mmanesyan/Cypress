describe('Invalid Login Tests', () => {
  it('should display an error message for invalid username', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.get('.flash.error').should('contain.text', 'Your username is invalid!');
  });
});

