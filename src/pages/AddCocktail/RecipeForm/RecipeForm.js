import React from 'react';
import classes from './RecipeForm.module.css';
import RecipeInput from '../RecipeInput/RecipeInput';
import store from '../../../store/store';

const RecipeForm = ({
  className,
  listItems,
  updateRecipe,
  removeRecipe,
  addRecipe,
}) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;

  const recipeUI = listItems?.map((step, i) => (
    <RecipeInput
      text={step.value}
      key={step.id}
      id={i}
      index={i}
      updateRecipe={(info) => updateRecipe(info)}
      removeStep={() => removeRecipe(i)}
      loading={loading}
    />
  ));

  return (
    <div className={classesList}>
      <label name="Method">Method</label>
      {recipeUI}
      <h6 className={classes.addBtn} onClick={addRecipe}>
        + Add another step
      </h6>
    </div>
  );
};

export default RecipeForm;
