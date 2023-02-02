export const trimCocktailInputs = (cocktailInfo) => {
  const updatedCocktail = { ...cocktailInfo };
  const ingredients = updatedCocktail.ingredients;
  const ingredientsTrimmed = ingredients.filter((ing) => {
    return ing.name;
  });
  const method = updatedCocktail.method;
  const methodTrimmed = method.filter((step) => {
    return step.value;
  });
  return {
    ...updatedCocktail,
    method: methodTrimmed,
    ingredients: ingredientsTrimmed,
  };
};
