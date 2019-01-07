import { BASE_URL } from '../../constants';
import { generateUser, generateRecipe } from '../../utils/generate';
import { createUser, createRecipe } from '../../utils/create';

describe('Recipe Actions', () => {
  let createdRecipe = {};

  beforeEach(() => {
    const user1 = generateUser();

    createUser(user1).then(userResponse => {
      const { body: { data: { access_token: token } } } = userResponse;

      const recipe1 = generateRecipe();

      createRecipe(recipe1, token).then(({ body: { data } }) => {
        const user2 = generateUser();
        createdRecipe = data.recipe;

        createUser(user2).then(({ body }) => {
          cy.window().then(window => {
            window.localStorage.setItem('authUser', JSON.stringify(body));
          });
        });
      });
    });
  });

  it('Should favourite a recipe', () => {
    cy.visit(`${BASE_URL}/recipe/${createdRecipe.id}`)

    cy.get('.ion-ios-heart-outline').click();
    cy.get('.noty_body').should('contain', 'Recipe favorited successfully.');
  });

  it('Should upvote a recipe', () => {
    cy.visit(`${BASE_URL}/recipe/${createdRecipe.id}`);

    cy.get('.ion-happy-outline').click();
    cy.get('.noty_body').should('contain', 'Recipe upvoted successfully.');
  });

  it('Should downvote a recipe', () => {
    cy.visit(`${BASE_URL}/recipe/${createdRecipe.id}`);

    cy.get('.ion-sad-outline').click();
    cy.get('.noty_body').should('contain', 'Recipe downvoted successfully.');
  });
});
