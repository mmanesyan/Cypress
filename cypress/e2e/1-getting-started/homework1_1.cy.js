describe('Login Test', () => {
	before (() => {
		cy.log("Start testing");
	});

	beforeEach  (() => {
		cy.visit('https://the-internet.herokuapp.com/forgot_password');
	});

	afterEach (() => {
		cy.log("Test ending");
	});

	after(() => {
    		cy.log('End');
  	});

	it("case start",  () => {
		cy.get('#email').type('Hello');
		cy.get('button[type="submit"]').click();
	});
});
