import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddCocktail.module.css";
import IngredientForm from "./IngredientForm/IngredientForm";
import { useDispatch } from "react-redux";

const AddCocktail = (props) => {
  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const cocktailInfo = {
      name: cocktailName.current.value,
      glass: cocktailGlass.current.value,
      type: cocktailType.current.value,

      id: cocktailName.current.value,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/15-09-26-RalfR-WLC-0084.jpg/1200px-15-09-26-RalfR-WLC-0084.jpg",
    };
    console.log(cocktailInfo);
    // props.onAddCocktail(cocktailInfo);
    dispatch({
      type: "ADD_COCKTAIL",
      cocktailInfo: {
        name: "Neil",
        glass: "piss",
      },
    });
  };
  const cocktailName = useRef();
  const cocktailType = useRef();
  const cocktailGlass = useRef();

  return (
    <Card classes={classes.addCocktail}>
      <form action="" onSubmit={formSubmitHandler}>
        <input placeholder="Cocktail Name" ref={cocktailName} required />
        <input placeholder="Cocktail Type" ref={cocktailType} required />
        <input placeholder="Glass" ref={cocktailGlass} required />

        <IngredientForm />
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
};

export default AddCocktail;
