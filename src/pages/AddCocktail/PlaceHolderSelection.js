import React, { useState } from 'react';
import classes from './PlaceHolderSelection.module.css';
import cocktailImages from '../../util/CocktailImages';
import Button from '../../components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PlaceHolderSelection = ({ className, onClose, onSubmit }) => {
  const classesList = `${classes.main} ${className}`;
  const [selected, setSelected] = useState('name');
  console.log(cocktailImages);

  const selectedIcon = (
    <div className={classes.checkIcon}>
      <FontAwesomeIcon icon={faCircleCheck} />
    </div>
  );

  const imagesJSX = Object.values(cocktailImages).map((name) => {
    console.log(name);
    return (
      <div className={classes.pic} key={name} onClick={() => setSelected(name)}>
        {selected === name && selectedIcon}
        <img src={name} alt="" />
      </div>
    );
  });
  return (
    <div className={classesList}>
      <h2>Pick your placeholder</h2>
      <div className={classes.picsContainer}>{imagesJSX}</div>
      <div className={classes.buttonContainer}>
        <Button onClick={() => onSubmit(selected)}>Select</Button>
        <Button type="alt" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PlaceHolderSelection;
