import faker from 'faker';

const baseUrl = 'http://localhost:5678/';

const generateRecipe = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(4),
  timeToCook: faker.random.number(),
  ingredients: [faker.lorem.sentence(), faker.lorem.sentence()],
  procedure: [faker.lorem.sentence(), faker.lorem.sentence()],
});

describe('Recipe Creation Process', () => {
  it('Should create a recipe for the user', () => {
    cy.visit(baseUrl);
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

    cy.url().should('equal', baseUrl);

    cy.get('[data-testid=createRecipeHome]').click();

    const fakeRecipe = generateRecipe();

    cy.get('[data-testid=recipeTitle]').type(fakeRecipe.title);
    cy.get('[data-testid=recipeTimeToCook]').type(fakeRecipe.timeToCook);
    cy.get('[data-testid=recipeDescription]').type(fakeRecipe.description);
    cy.get('[data-testid=recipeIngredient-0]').type(fakeRecipe.ingredients[0]);
    cy.get('[data-testid=recipeAddIngredient]').click();
    cy.get('[data-testid=recipeIngredient-1]').type(fakeRecipe.ingredients[1]);
    cy.get('[data-testid=recipeProcedure-0]').type(fakeRecipe.procedure[0]);
    cy.get('[data-testid=recipeAddProcedure]').click();
    cy.get('[data-testid=recipeProcedure-1]').type(fakeRecipe.procedure[1]);

    cy.get('[data-testid=recipePublish]').click();

    cy.url().should('contain', 'recipe');
    cy.contains(fakeRecipe.title);
    cy.contains(fakeRecipe.description);
    cy.contains(fakeRecipe.timeToCook);
    cy.contains(fakeRecipe.ingredients[0]);
    cy.contains(fakeRecipe.ingredients[1]);
    cy.contains(fakeRecipe.procedure[0]);
    cy.contains(fakeRecipe.procedure[1]);
  
  });
});
