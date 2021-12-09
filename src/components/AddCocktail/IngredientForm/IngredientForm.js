import React, { useState } from "react";
import IngredientInput from "../IngredientInput/IngredientInput";
import classes from "./IngredientForm.module.css";

const IngredientForm = (props) => {
  console.log("restart");
  const [ingredientsList, setIngredientsList] = useState([
    {
      name: "Bourbon",
      quantity: 2,
      unit: "oz",
    },
    {
      name: "Sugar",
      quantity: 5,
      unit: "ml",
    },
    {
      name: "Bitters",
      quantity: 2,
      unit: "dash",
    },
  ]);
  const removeIngredientHandler = (index) => {
    const newIngList = [...ingredientsList];
    newIngList.splice(index, 1);
    console.log(newIngList);
    setIngredientsList(newIngList);
  };
  const ingredientUpdateHandler = (name, amount, unit, index) => {
    const newIngList = [...ingredientsList];

    console.log(name);
    console.log(amount);
    console.log(unit);
    console.log(index);
    newIngList[index].name = name;
    newIngList[index].quantity = amount;
    newIngList[index].unit = unit;
    console.log(newIngList);

    setIngredientsList(newIngList);
    return;
  };
  console.log(ingredientsList);
  const ingredients = ingredientsList.map((ing, i) => {
    console.log("index number", i);
    return (
      <IngredientInput
        removeIngredient={() => removeIngredientHandler(i)}
        ingredientUpdater={ingredientUpdateHandler}
        key={i}
        id={i}
        name={ing.name}
        quantity={ing.quantity}
        unit={ing.unit}
      />
    );
  });

  const addIngredientHandler = (e) => {
    e.preventDefault();

    const newList = [
      ...ingredientsList,
      {
        name: "",
        quantity: 0,
        unit: "ml",
      },
    ];
    setIngredientsList(newList);
  };

  return (
    <div className={classes.ingForm}>
      {ingredients}

      <button onClick={addIngredientHandler}>Add ingredient</button>
    </div>
  );
};

export default IngredientForm;
