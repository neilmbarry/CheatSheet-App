import React, { useRef } from 'react';
import classes from './IngredientInput.module.css';
import FormInput from '../../UI/FormInput';
import FormDropdown from '../../UI/FormDropdown';
import Button from '../../UI/Button';

const IngredientInput = ({ name, brand, quantity, unit, removeIngredient }) => {
  const removeIngredientHandler = () => {
    removeIngredient();
  };

  const ingredientChangeHandler = () => {
    return;
  };

  return (
    <div className={classes.ingredient}>
      <FormInput
        type="text"
        value={name}
        placeholder="Type (e.g. Gin)"
        changeHandler={ingredientChangeHandler}
      />
      <FormInput
        type="text"
        value={brand}
        placeholder="Brand (Optional)"
        changeHandler={ingredientChangeHandler}
      />

      <FormInput
        type="number"
        min="0"
        value={quantity}
        placeholder="1"
        changeHandler={ingredientChangeHandler}
      />
      <FormDropdown options={['ml', 'oz', 'dash']} selected={unit} />
      {/* <select
        name=""
        id=""
        ref={ingUnitRef}
     
        value={props.unit}
      >
        <option value="ml">ml</option>
        <option value="oz">oz</option>
        <option value="dash">dash</option>
      </select> */}
      <Button onClick={removeIngredientHandler}></Button>
    </div>
  );
};

export default IngredientInput;
