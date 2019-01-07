import faker from 'faker';

const baseUrl = 'http://localhost:5678';

const generateRecipe = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(3),
  timeToCook: faker.random.number(),
  ingredients: [faker.lorem.sentence(), faker.lorem.sentence()],
  procedure: [faker.lorem.sentence(), faker.lorem.sentence()],
});

const generateUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('Recipe Creation Process', () => {
  let fakeUser;

  beforeEach(() => {
    fakeUser = generateUser();

    cy.request('POST', `${baseUrl}/api/v1/users/signup`, fakeUser)
      .then(({ body }) => {
        cy.window().then(window => {
          window.localStorage.setItem('authUser', JSON.stringify(body));
        })
      });
  });

  it('Should create a recipe for the user', () => {
    cy.visit(baseUrl);

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
