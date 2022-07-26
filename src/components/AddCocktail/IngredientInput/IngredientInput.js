import React from 'react';
import classes from './IngredientInput.module.css';
import FormInput from '../../UI/FormInput';
import FormDropdown from '../../UI/FormDropdown';
// import Button from '../../UI/Button';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IngredientInput = ({
  ing,
  removeIngredient,
  id,
  index,
  updateIngredient,
}) => {
  const removeIngredientHandler = () => {
    removeIngredient();
  };

  const ingredientChangeHandler = (e) => {
    const value = e.target.value;
    const type = e.target.id;
    updateIngredient({ value, type, index });
    return;
  };

  return (
    <div className={classes.ingredient}>
      <div className={classes.inputList}>
        <FormInput
          type="number"
          min={0}
          value={ing.quantity}
          id="quantity"
          placeholder="1"
          changeHandler={ingredientChangeHandler}
        />
        <FormInput
          type="text"
          value={ing.type}
          id="type"
          placeholder="Type (e.g. Gin)"
          changeHandler={ingredientChangeHandler}
        />
        <FormInput
          type="text"
          value={ing.brand}
          id="brand"
          placeholder="Brand (Optional)"
          changeHandler={ingredientChangeHandler}
        />
      </div>
      <FormDropdown
        options={['ml', 'oz', 'dash']}
        selected={ing.unit}
        changeHandler={ingredientChangeHandler}
        id="unit"
      />
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
      <div className={classes.close} onClick={removeIngredientHandler}>
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default IngredientInput;
