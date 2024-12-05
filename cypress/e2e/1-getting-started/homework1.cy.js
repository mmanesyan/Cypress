describe('Login Test Suite', () => {
  before(() => {
    cy.log('Starting Login Test Suite');
  });

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  afterEach(() => {
    cy.log('Test completed');
  });

  after(() => {
    cy.log('All tests completed');
  });

  it('should navigate to login page and login successfully', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
  });
});
