import React from 'react';
import classes from './IngredientInput.module.css';
import FormInput from '../../../components/UI/FormInput';
import FormDropdown from '../../../components/UI/FormDropdown';
// import Button from '../../UI/Button';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import DeleteButton from '../../../components/UI/DeleteButton';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

import { unitOptions } from '../../../config/dropdownOptions/unitOptions';

const IngredientInput = ({
  ing,
  removeIngredient,
  index,
  updateIngredient,
  loading,
}) => {
  const removeIngredientHandler = () => {
    removeIngredient();
  };

  const ingredientChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    updateIngredient({ value, name, index });
    return;
  };

  const unitChangeHandler = (value) => {
    updateIngredient({ value, name: 'unit', index });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classes.ingredient}
    >
      <div className={classes.inputList}>
        <FormInput
          type="text"
          value={ing.brand}
          id="brand"
          placeholder="Brand (optional)"
          changeHandler={ingredientChangeHandler}
          loading={loading}
          className={classes.brand}
        />

        <FormInput
          type="text"
          value={ing.name}
          id="name"
          placeholder="Ingredient*"
          changeHandler={ingredientChangeHandler}
          loading={loading}
          className={classes.ing}
        />
        <FormInput
          type="number"
          min={0}
          value={ing.quantity}
          id="quantity"
          placeholder="1"
          changeHandler={ingredientChangeHandler}
          loading={loading}
          className={classes.quantity}
        />
        <Dropdown
          options={unitOptions}
          placeholder="- Unit -"
          updateValue={unitChangeHandler}
          id="unit"
          selected={ing.unit}
          className={classes.unit}
        />
      </div>
      {/* <FormDropdown
        options={['ml', 'oz', 'dash']}
        selected={ing.unit}
        changeHandler={ingredientChangeHandler}
        id="unit"
        loading={loading}
      /> */}
      <DeleteButton onClick={removeIngredientHandler} />
    </motion.div>
  );
};

export default IngredientInput;
