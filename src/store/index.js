import React from "react";
import { createStore } from "redux";

const initialState = {
  cocktails: [
    {
      name: "Old Fashioned",
      type: "Spirit Forward",
      glass: "Rocks",
      ingredients: "Bourbon, Bitters, Sugar",
      recipe: [
        {
          ingredient: "Bourbon",
          quantity: 2,
          unit: "oz",
        },
        {
          ingredient: "Angostura Bitters",
          quantity: 2,
          unit: "dash(es)",
        },
        {
          ingredient: "Simple Syrup",
          quantity: 5,
          unit: "ml",
        },
      ],
      method:
        "Add all ingredients to rocks glass and stir with ice. Garnish with an orange twist.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Whiskey_Old_Fashioned1.jpg",
      author: "Neil Barry",
      id: 1,
    },
    {
      name: "Negroni",
      type: "Sprit Forward",
      glass: "Rocks",
      ingredients: "Gin, Sweet Vermouth, Campari",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Manhattan_cocktail.jpg",
      id: 2,
    },
    {
      name: "Gimlet",
      type: "Citrus Forward",
      glass: "Coupe",
      ingredients: "Gin, Lime, Sugar",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/87/15-09-26-RalfR-WLC-0067.jpg",
      id: 3,
    },
  ],
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_COCKTAIL") {
    console.log("adding cocktail...");
    const newCocktail = {
      name: action.cocktailInfo.name,
      type: action.cocktailInfo.type,
      glass: action.cocktailInfo.glass,
      ingredients: action.cocktailInfo.ingredients,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/87/15-09-26-RalfR-WLC-0067.jpg",
    };
    console.log(newCocktail);
    const updatedList = state.cocktails.splice().push(newCocktail);
    console.log(updatedList);
    return { cocktails: updatedList };
  }
  if (action.type === "REMOVE_COCKTAIL") {
    return state;
  }
  if (action.type === "EDIT_COCKTAIL") {
    return state;
  }
  return state;
};

const store = createStore(reducer);

export default store;
