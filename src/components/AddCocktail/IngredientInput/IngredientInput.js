import React, { useRef } from "react";
import classes from "./IngredientInput.module.css";

const IngredientInput = (props) => {
  const ingNameRef = useRef();
  const ingAmountRef = useRef();
  const ingUnitRef = useRef();
  const removeIngredientHandler = (e) => {
    e.preventDefault();
    props.removeIngredient();
  };
  const ingredientChangeHandler = () => {
    props.ingredientUpdater(
      ingNameRef.current.value,
      ingAmountRef.current.value,
      ingUnitRef.current.value,
      props.id
    );
  };

  return (
    <div className={classes.input}>
      <input
        type="text"
        ref={ingNameRef}
        onChange={ingredientChangeHandler}
        value={props.name}
      />

      <input
        type="number"
        min="0"
        ref={ingAmountRef}
        onChange={ingredientChangeHandler}
        value={props.quantity}
      />
      <select
        name=""
        id=""
        ref={ingUnitRef}
        onChange={ingredientChangeHandler}
        value={props.unit}
      >
        <option value="ml">ml</option>
        <option value="oz">oz</option>
        <option value="dash">dash</option>
      </select>
      <button onClick={removeIngredientHandler}>X</button>
    </div>
  );
};

export default IngredientInput;
