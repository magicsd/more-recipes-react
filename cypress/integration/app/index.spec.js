import { BASE_URL } from '../../constants';

describe('Home page tests', () => {
  it('Should have login and sign in buttons', () => {
    cy.visit(BASE_URL);
    cy.get('span > .mr-2').should('have.text', 'Sign in');
    cy.get('[href="/auth/register"]').should('have.text', 'Join now');
  });
});
