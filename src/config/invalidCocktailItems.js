export const invalidCocktailItems = (cocktailInfo) => {
  const invalidArray = [];
  if (!cocktailInfo.name) invalidArray.push('name');
  if (!cocktailInfo.flavour) invalidArray.push('flavour');
  if (!cocktailInfo.glass) invalidArray.push('glass');
  if (!cocktailInfo.ingredients.length) invalidArray.push('ingredients');
  if (!cocktailInfo.method.length) invalidArray.push('method');
  return invalidArray;
};
