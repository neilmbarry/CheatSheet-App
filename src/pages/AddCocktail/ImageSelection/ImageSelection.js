import React, { useState } from 'react';
import classes from './ImageSelection.module.css';
import cocktailImages from '../../../util/CocktailImages';
import Button from '../../../components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import createCocktailActions from '../../../store/createCocktailSlice';

const PlaceHolderSelection = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [selected, setSelected] = useState(null);

  const selectedIcon = (
    <div className={classes.checkIcon}>
      <FontAwesomeIcon icon={faCircleCheck} />
    </div>
  );

  const imagesJSX = Object.values(cocktailImages).map((name) => {
    return (
      <div
        className={classes.pic}
        key={name}
        onClick={() => submitHandler(name)}
      >
        {selected === name && selectedIcon}
        <img src={name} alt="" />
      </div>
    );
  });

  const submitHandler = (name) => {
    store.dispatch(createCocktailActions.changeImage(name));
    store.dispatch(configActions.setModal(null));
  };

  return (
    <div className={classesList}>
      <h2>Choose your image</h2>
      <div className={classes.picsContainer}>{imagesJSX}</div>
      {/* <div className={classes.buttonContainer}>
        <Button type="main" onClick={submitHandler}>
          Select
        </Button>
        <Button
          type="alt"
          onClick={() => store.dispatch(configActions.setModal(null))}
        >
          Cancel
        </Button>
      </div> */}
    </div>
  );
};

export default PlaceHolderSelection;
