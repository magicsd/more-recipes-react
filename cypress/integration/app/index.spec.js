const baseUrl = 'http://localhost:5678/';

describe('Home page tests', () => {
  it('Should have login and sign in buttons', () => {
    cy.visit(baseUrl);
    cy.get('span > .mr-2').should('have.text', 'Sign in');
    cy.get('[href="/auth/register"]').should('have.text', 'Join now');
  });
});
