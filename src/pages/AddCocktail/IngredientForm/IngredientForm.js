import React, { useCallback } from 'react';
import classes from './IngredientForm.module.css';

import IngredientInput from '../IngredientInput/IngredientInput';
import store from '../../../store/store';

import createCocktailActions from '../../../store/createCocktailSlice';
import { useSelector } from 'react-redux';

import { generateId } from '../../../util/generateId';
import { useEffect } from 'react';

const IngredientForm = ({ className, listItems }) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;

  const cocktailInfo = useSelector((state) => state.create.value);

  const addIngredientHandler = useCallback(() => {
    store.dispatch(
      createCocktailActions.changeIngredients([
        ...cocktailInfo.ingredients,
        { id: generateId() },
      ])
    );
  }, [cocktailInfo.ingredients]);

  const updateIngredient = (info) => {
    console.log(info);
    const updatedIng = cocktailInfo.ingredients.map((ing, i) => {
      if (info.index === i) {
        return {
          ...ing,
          [info.name]: info.value,
        };
      }
      return ing;
    });

    console.log(updatedIng);
    store.dispatch(createCocktailActions.changeIngredients(updatedIng));
    // store.dispatch();
  };

  const removeIngredient = (id) => {
    const updatedIng = cocktailInfo.ingredients.filter((ing) => {
      if (id === ing.id) {
        return false;
      }
      return true;
    });
    console.log(updatedIng);
    store.dispatch(createCocktailActions.changeIngredients(updatedIng));
    // store.dispatch();
  };

  const ingredientsUI = cocktailInfo.ingredients.map((ing, i) => {
    return (
      <IngredientInput
        ing={ing}
        key={ing.id}
        id={ing.id}
        index={i}
        updateIngredient={(info) => updateIngredient(info)}
        removeIngredient={() => removeIngredient(ing.id)}
        loading={loading}
      />
    );
  });

  useEffect(() => {
    if (cocktailInfo.ingredients.length === 0) {
      addIngredientHandler();
    }
  }, [addIngredientHandler, cocktailInfo.ingredients.length]);

  return (
    <div className={classesList}>
      <label name="Ingredients" className={classes.label}>
        Ingredients*
      </label>
      {ingredientsUI}
      <h6 className={classes.addBtn} onClick={addIngredientHandler}>
        + Add another ingredient
      </h6>
    </div>
  );
};

export default IngredientForm;
