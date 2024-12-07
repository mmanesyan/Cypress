describe('Invalid Login Tests', () => {
  it('display an error message for invalid username', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.login('invalidUser', 'SuperSecretPassword!');
    cy.get('.flash.error')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!')
      .and('have.css', 'background-color', 'rgb(198, 15, 19)')
      .and('have.class', 'error');
    cy.url().should('include', '/login');
    cy.get('#username').should('have.value', '');
  });

  it('display an error message for invalid password', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.login('tomsmith', 'wrongPassword');
    cy.get('.flash.error')
      .should('be.visible')
      .and('contain.text', 'Your password is invalid!')
      .and('not.contain.text', 'Your username is invalid!');
    cy.url().should('include', '/login');
  });

  it('handle invalid login using then() method', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.get('.flash.error').then((errorMessage) => {
      expect(errorMessage).to.be.visible;
      expect(errorMessage.text().trim()).to.include('Your username is invalid!');
    });
    cy.get('#username').then((usernameInput) => {
      expect(usernameInput.val()).to.equal('');
    });
  });
});

