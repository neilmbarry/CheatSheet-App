import React from 'react';
import { useSelector } from 'react-redux';
import configActions from '../../../store/configSlice';

import createCocktailActions from '../../../store/createCocktailSlice';
import store from '../../../store/store';
import classes from './ImageContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteButton from '../../../components/UI/DeleteButton';
import Button from '../../../components/UI/Button';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';

const ImageContainer = ({ className }) => {
  const cocktailInfo = useSelector((state) => state.create.value);
  const classesList = `${classes.main} ${className}`;
  const showImageSelection = () => {
    store.dispatch(configActions.setModal('imageSelection'));
  };

  const removeCocktailImage = () => {
    store.dispatch(createCocktailActions.changeImage(null));
  };

  const cocktailImage = cocktailInfo.image ? (
    <img src={cocktailInfo.image} alt="none" />
  ) : (
    <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
  );

  const cocktailButton = cocktailInfo.image ? (
    <DeleteButton className={classes.delete} onClick={removeCocktailImage} />
  ) : (
    <Button
      type="alt"
      className={classes.imageButton}
      onClick={showImageSelection}
    >
      Select Image
    </Button>
  );
  return (
    <div className={classesList}>
      {cocktailImage}
      {cocktailButton}
    </div>
  );
};

export default ImageContainer;
