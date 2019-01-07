import { BASE_URL } from '../constants';

const ENDPOINTS = {
  signup: `${BASE_URL}/api/v1/users/signup`,
  recipes: `${BASE_URL}/api/v1/recipes`,
};

export const createUser = (user) => {
  return cy.request('POST', ENDPOINTS.signup, user);
};

export const createRecipe = (recipe, token) => {
  const { title, description, timeToCook, ingredients, procedure } = recipe;
  return cy.request('POST', ENDPOINTS.recipes, {
    title,
    description,
    timeToCook,
    ingredients: JSON.stringify(ingredients),
    procedure: JSON.stringify(procedure),
    imageUrl: 'http://res.cloudinary.com/bahdcoder/image/upload/v1519099617/ddddd_cmqwxl.png',
    access_token: token,
  });
};
