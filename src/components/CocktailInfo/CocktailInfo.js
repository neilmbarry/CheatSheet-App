import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
// import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import Spinner from '../UI/Spinner';
import classes from './CocktailInfo.module.css';
import TypeIcon from '../UI/TypeIcon';

const CocktailInfo = (props) => {
  const [cocktailInfo, setCocktailInfo] = useState();
  const params = useParams();
  // console.log(history.location.pathname);
  // console.log(history);
  console.log(params.slug);
  const fetchCocktail = () => {
    fetch(`
    http://127.0.0.1:8000/api/v1/cocktails?slug=${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cocktails);
        setCocktailInfo(data.cocktails);
      })
      .catch((err) => console.log('ERROR OCCURED', err));
  };
  useEffect(fetchCocktail, [params.slug]);
  // const cocktailInfo = cocktails.find((item) => item.id === +params.id);
  if (!cocktailInfo) {
    return <Spinner />;
  }
  console.log(cocktailInfo);
  console.log(cocktailInfo[0]);
  console.log(cocktailInfo[0].name);
  const ingredients = cocktailInfo[0].recipe.map((elem) => {
    return (
      <p key={elem.ingredient}>
        {elem.quantity + elem.unit} of {elem.ingredient}
      </p>
    );
  });

  console.log(ingredients);
  return (
    <div className={classes.container}>
      <Card classes={classes.card}>
        <div className={classes.image_container}>
          <img src={cocktailInfo[0].image} alt="" />
        </div>

        <h3>{cocktailInfo[0].name}</h3>
        <div className={classes.iconContainer}>
          <TypeIcon type="glass" name={cocktailInfo[0].glassType} />
          <TypeIcon type="cocktail" name={cocktailInfo[0].cocktailType} />
        </div>
        {ingredients}
        <h5>Garnish: {cocktailInfo[0].garnish}</h5>
        <h5 className={classes.method}>{cocktailInfo[0].method}</h5>
      </Card>
    </div>
  );
};
export default CocktailInfo;
