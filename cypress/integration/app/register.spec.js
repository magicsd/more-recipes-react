import { BASE_URL } from '../../constants';
import faker from 'faker';

describe('Registration Process', () => {
  it('Should register a new user', () => {
    cy.visit(BASE_URL);
    cy.get('[href="/auth/register"]').click();

    const fakeUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    cy.get('input[name="name"]').type(fakeUser.name);
    cy.get('input[name="email"]').type(fakeUser.email);
    cy.get('input[name="password"]').type(fakeUser.password);
    cy.get('input[name="confirmPassword"]').type(fakeUser.password);
    cy.get('.btn').click();

    cy.url().should('equal', `${BASE_URL}/`);

    cy.get('span > .mr-2').should('have.text', 'Create recipe');
  });
});
