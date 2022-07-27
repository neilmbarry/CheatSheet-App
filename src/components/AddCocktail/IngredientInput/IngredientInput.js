import React from 'react';
import classes from './IngredientInput.module.css';
import FormInput from '../../UI/FormInput';
import FormDropdown from '../../UI/FormDropdown';
// import Button from '../../UI/Button';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

const IngredientInput = ({
  ing,
  removeIngredient,
  id,
  index,
  updateIngredient,
  loading
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classes.ingredient}
    >
      <div className={classes.inputList}>
        <FormInput
          type="number"
          min={0}
          value={ing.quantity}
          id="quantity"
          placeholder="1"
          changeHandler={ingredientChangeHandler}
          loading={loading}
        />
        <FormInput
          type="text"
          value={ing.type}
          id="type"
          placeholder="Type (e.g. Gin)"
          changeHandler={ingredientChangeHandler} loading={loading}
        />
        <FormInput
          type="text"
          value={ing.brand}
          id="brand"
          placeholder="Brand (Optional)"
          changeHandler={ingredientChangeHandler} loading={loading}
        />
      </div>
      <FormDropdown
        options={['ml', 'oz', 'dash']}
        selected={ing.unit}
        changeHandler={ingredientChangeHandler}
        id="unit" loading={loading}
      />
      <div className={classes.close} onClick={removeIngredientHandler}>
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
      </div>
    </motion.div>
  );
};

export default IngredientInput;
