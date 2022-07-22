import React from 'react';
import classes from './CocktailIngredients.module.css';

const CocktailIngredients = ({ className, ingredients }) => {
  const classesList = `${classes.main} ${className}`;
  // const ingredientsHTMLAlternative = ingredients.map((ing) => {

  //   return (
  //     <div key={ing.ingredient}>
  //       <p>{ing.quantity}</p>
  //       <p>
  //         {ing.unit} {ing.ingredient}
  //       </p>
  //     </div>
  //   );
  // });
  console.log(ingredients);
  const ingredientsHTML = ingredients.map((ing, i) => {
    console.log(ing);
    return (
      <div key={i}>
        <p>
          {ing.quantity}
          {ing.unit} {ing.type}{' '}
          <span style={{ color: 'grey', fontWeight: '300' }}>{ing.brand}</span>
        </p>
      </div>
    );
  });

  return (
    <div className={classesList}>
      <h3>Ingredients</h3>
      {ingredientsHTML}
    </div>
  );
};

export default CocktailIngredients;
