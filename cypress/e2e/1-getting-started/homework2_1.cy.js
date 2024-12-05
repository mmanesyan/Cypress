describe('Login Tests', () => {
  const extractCredentials = (text) => {
    const usernameMatch = text.match(/Enter (\w+) for the username/);
    const passwordMatch = text.match(/and ([\w!]+) for the password/);

    return {
      username: usernameMatch ? usernameMatch[1] : null,
      password: passwordMatch ? passwordMatch[1] : null,
    };
  };

  it('should log in successfully with valid credentials', () => {
    cy.visit('https://the-internet.herokuapp.com/login');

    cy.get('#content > div > h4')
      .invoke('text')
      .then((text) => {
        const credentials = extractCredentials(text);

        cy.get('#username').type(credentials.username);
        cy.get('#password').type(credentials.password);
        cy.get('button[type="submit"]').click();
        cy.get('.flash.success').should('contain.text', 'You logged into a secure area!');
      });
  });
});

