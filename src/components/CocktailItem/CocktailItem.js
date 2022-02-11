import React from 'react';
import classes from './CocktailItem.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import TypeIcon from '../UI/TypeIcon';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/es/index';

const CocktailItem = (props) => {
  // const removeCocktailHandler = (id) => {
  //   // props.onRemoveCocktail(id);
  //   return;
  // };
  const ingredients = props.cocktailInfo.recipe
    .map((ingObj) => ingObj.ingredient)
    .join(', ');

  return (
    <motion.div layout>
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
          <div className={classes.iconContainer}>
            <TypeIcon type="glass" name={props.cocktailInfo.glassType} />
            <TypeIcon type="cocktail" name={props.cocktailInfo.cocktailType} />
          </div>
          <h4>{props.cocktailInfo.ingredients}</h4>
          <p>{ingredients}</p>
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
    </motion.div>
  );
};

export default CocktailItem;
