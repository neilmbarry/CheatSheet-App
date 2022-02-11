import React from 'react';
import classes from './CocktailItem.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const CocktailItem = (props) => {
  // const removeCocktailHandler = (id) => {
  //   // props.onRemoveCocktail(id);
  //   return;
  // };

  return (
    <Card classes={classes.cocktailItem}>
      <div className={classes.imageContainer}>
        <img
          src={props.cocktailInfo.image}
          alt={props.cocktailInfo.name}
          className="test"
        />
      </div>
      <div className={classes.textContainer}>
        <h3>{props.cocktailInfo.name}</h3>
        <h4>{props.cocktailInfo.glassType}</h4>
        <h4>{props.cocktailInfo.ingredients}</h4>
        <p>{props.cocktailInfo.cocktailType}</p>
        <Link to={`/cocktails/${props.cocktailInfo.slug}`}>
          <Button>More Info</Button>
        </Link>
        {/* <Button
          onClick={removeCocktailHandler.bind(null, props.cocktailInfo.id)}
        >
          Remove Cocktail
        </Button> */}
      </div>
    </Card>
  );
};

export default CocktailItem;
