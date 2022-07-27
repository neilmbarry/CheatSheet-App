import React from 'react';
import classes from './IngredientForm.module.css';

import IngredientInput from '../IngredientInput/IngredientInput';
import { AnimatePresence } from 'framer-motion';

const IngredientForm = ({
  className,
  listItems,
  updateIngredient,
  removeIngredient,
  addIngredient,
  loading,
}) => {
  const classesList = `${classes.main} ${className}`;

  const ingredientsUI = listItems.map((ing, i) => {
    return (
      <IngredientInput
        ing={ing}
        key={ing.id}
        id={ing.id}
        index={i}
        updateIngredient={(info) => updateIngredient(info)}
        // ref={cocktailName}
        removeIngredient={() => removeIngredient(i)}
        loading={loading}

        // removeIngredient={() => removeIngredientHandler(ing.id)}
      />
    );
  });

  return (
    <div className={classesList}>
      <label name="Ingredients">Ingredients</label>
      {ingredientsUI}
      <h6 className={classes.addBtn} onClick={addIngredient}>
        + Add another ingredient
      </h6>
    </div>
  );
};

export default IngredientForm;
