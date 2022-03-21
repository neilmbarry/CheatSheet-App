import React from 'react';
import FormInput from '../../UI/FormInput';
import classes from './RecipeInput.module.css';
import Button from '../../UI/Button';

const RecipeInput = ({ text, index, removeStep }) => {
  return (
    <div className={classes.recipe}>
      <div className={classes.step}>
        <p>{index + 1}.</p>
      </div>
      <FormInput placeholder="Enter Step" value={text} />
      <Button onClick={removeStep} />
    </div>
  );
};

export default RecipeInput;
