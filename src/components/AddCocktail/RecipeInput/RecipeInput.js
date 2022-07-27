import React from 'react';
import FormInput from '../../UI/FormInput';
import classes from './RecipeInput.module.css';
// import Button from '../../UI/Button';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

const RecipeInput = ({ text, index, removeStep, updateRecipe, loading }) => {
  const recipeChangeHandler = (e) => {
    const value = e.target.value;
    return updateRecipe({ value, index });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classes.recipe}
    >
      <div className={classes.step}>
        <p>{index + 1}</p>
      </div>
      <FormInput
        placeholder="Enter Step"
        value={text}
        changeHandler={recipeChangeHandler}
        loading={loading}
      />
      <div className={classes.close} onClick={removeStep}>
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
      </div>
    </motion.div>
  );
};

export default RecipeInput;
