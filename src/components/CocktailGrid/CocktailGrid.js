import React from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import photo from '../../img/paper.jpg';

const CocktailGrid = () => {
  return (
    <div className={classes.cocktailGrid}>
      <CocktailTitle
        className={classes.title}
        title="Paper Plane"
        author="Neil Barry, Sydney, Australia"
        date="January 19, 2022"
        rating="4.9"
        reviews="102"
      />
      <div className={classes.pic}>
        <img src={photo} alt="" />
      </div>
      <CocktailIngredients
        className={classes.ing}
        ingredients={[
          { ingredient: 'Bourbon', unit: 'ml', quantity: 22 },
          { ingredient: 'Amaro Nonino', unit: 'ml', quantity: 22 },
          { ingredient: 'Aperol', unit: 'ml', quantity: 22 },
          { ingredient: 'Lemon Juice', unit: 'ml', quantity: 22 },
        ]}
      />
      <CocktailMethod className={classes.method} />
      <CocktailReviews className={classes.rev} />
    </div>
  );
};

export default CocktailGrid;
