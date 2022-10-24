import React from 'react';
import classes from './IngredientForm.module.css';

import IngredientInput from '../IngredientInput/IngredientInput';
import store from '../../../store/store';

const IngredientForm = ({
  className,
  listItems,
  updateIngredient,
  removeIngredient,
  addIngredient,
}) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;

  const ingredientsUI = listItems?.map((ing, i) => {
    return (
      <IngredientInput
        ing={ing}
        key={ing.id}
        id={ing.id}
        index={i}
        updateIngredient={(info) => updateIngredient(info)}
        removeIngredient={() => removeIngredient(i)}
        loading={loading}
      />
    );
  });

  return (
    <div className={classesList}>
      <label name="Ingredients">Ingredients*</label>
      {ingredientsUI}
      <h6 className={classes.addBtn} onClick={addIngredient}>
        + Add another ingredient
      </h6>
    </div>
  );
};

export default IngredientForm;
