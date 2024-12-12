describe('Login Tests', () => {
  const extractCredentials = (text) => {
    const usernameMatch = text.match(/Enter (\w+) for the username/);
    const passwordMatch = text.match(/and ([\w!]+) for the password/);

    return {
      username: usernameMatch ? usernameMatch[1] : null,
      password: passwordMatch ? passwordMatch[1] : null,
    };
  };

  it('log in successfully', () => {
    cy.visit('https://the-internet.herokuapp.com/login');

    cy.get('#content > div > h4')
      .invoke('text')
      .then((text) => {
        const credentials = extractCredentials(text);
	
	cy.login(credentials.username, credentials.password);

        //cy.get('#username').type(credentials.username);
        //cy.get('#password').type(credentials.password);
        //cy.get('button[type="submit"]').click();

        cy.get('.flash.success')
          .should('be.visible')
          .and('contain.text', 'You logged into a secure area!');
        cy.url().should('include', '/secure');
        cy.get('h2').invoke('text').should('eq', ' Secure Area');
        cy.get('a.button.secondary').should('exist').and('be.visible');
      });
  });

  it('display an error message', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('invalidPassword');
    cy.get('button[type="submit"]').click();

    cy.get('.flash.error')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');
    cy.url().should('include', '/login');
    cy.get('#username').should('have.value', '');
  });

  it('log in and verify elements using then() method', () => {
    cy.visit('https://the-internet.herokuapp.com/login');

    cy.get('#content > div > h4')
      .invoke('text')
      .then((text) => {
        const credentials = extractCredentials(text);

	cy.login(credentials.username, credentials.password);      
        //cy.get('#username').type(credentials.username);
        //cy.get('#password').type(credentials.password);
        //cy.get('button[type="submit"]').click();

        cy.get('.flash.success').then((flashMessage) => {
          expect(flashMessage).to.be.visible;
          expect(flashMessage.text()).to.include('You logged into a secure area!');
        });

        cy.get('h2').then((header) => {
          expect(header.text()).to.equal(' Secure Area');
        });
      });
  });
});

