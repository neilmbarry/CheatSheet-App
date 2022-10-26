import React from 'react';
import classes from './AddCocktailBox.module.css';

import Tile from '../../../components/UI/Tile/Tile';
import LabelInput from '../LabelInput/LabelInput';
import LabelDropdown from '../LabelInput/LabelDropdown';
import Button from '../../../components/UI/Button';
import IngredientForm from '../IngredientForm/IngredientForm';
import MethodForm from '../MethodForm/MethodForm';
import LoadingSpinner from '../../../components/UI/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';

import createCocktailActions from '../../../store/createCocktailSlice';
import configActions from '../../../store/configSlice';

import PageBreak from '../../../components/UI/PageBreak';

import { useSelector } from 'react-redux';
import store from '../../../store/store';
import { useCallback } from 'react';

import { generateId } from '../../../util/generateId';
import DeleteButton from '../../../components/UI/DeleteButton';

import Title from '../../../components/UI/Title/Title';

import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const optionsTemplate = [
  { icon: 'faWhiskeyGlass', name: 'Flute' },
  { icon: 'faWineGlass', name: 'Tall' },
  { icon: 'faWhiskeyGlass', name: 'Short' },
  { icon: 'faMartiniGlass', name: 'Coupe' },
  { icon: 'faWineGlass', name: 'Rocks' },
];
const flavoursTemplate = [
  { icon: 'faLemon', name: 'Citrusy' },
  { icon: 'faDroplet', name: 'Boozy' },
  { icon: 'faCookieBite', name: 'Sweet' },
  { icon: 'faSpider', name: 'Bitter' },
  { icon: 'faPepperHot', name: 'Spicy' },
];

const AddCocktailBox = ({ className, remove, title, subtitle }) => {
  const classesList = `${classes.main} ${className}`;

  const cocktailInfo = useSelector((state) => state.create.value);

  const loading = useSelector((state) => state.config.value.loading);

  const submitFormHandler = () => null;

  console.log('add cocktail renedered');

  const addMethodHandler = () => {
    store.dispatch(
      createCocktailActions.changeMethod([
        ...cocktailInfo.method,
        { id: generateId() },
      ])
    );
  };

  const updateNameHandler = useCallback((value) => {
    store.dispatch(createCocktailActions.changeName(value));
  }, []);
  const updateFlavourHandler = useCallback((value) => {
    store.dispatch(createCocktailActions.changeFlavour(value));
  }, []);
  const updateGlassHandler = useCallback((value) => {
    store.dispatch(createCocktailActions.changeGlass(value));
  }, []);
  const updateGarnishHandler = useCallback((value) => {
    store.dispatch(createCocktailActions.changeGarnish(value));
  }, []);
  const updateAuthorHandler = useCallback((value) => {
    store.dispatch(createCocktailActions.changeAuthor(value));
  }, []);

  const showImageSelection = () => {
    store.dispatch(configActions.setModal('imageSelection'));
  };

  const removeCocktailImage = () => {
    store.dispatch(createCocktailActions.changeImage(null));
  };

  const deleteButton = remove && (
    <div className={classes.closeIcon} onClick={() => null}>
      <FontAwesomeIcon icon={faCircleXmark} />
    </div>
  );

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
    <Tile className={classesList}>
      <Title title={title} />
      <div className={classes.firstGroup}>
        <div className={classes.firstGroup_left}>
          <LabelInput
            label="cocktail"
            name="Cocktail Name*"
            placeholder="e.g. Old Fashioned"
            updateValue={updateNameHandler}
            defaultValue={cocktailInfo.name}
          />
          {/* <LabelInput
            label="flavour"
            name="Flavour Profile*"
            placeholder="e.g. Citrus Forward"
            updateValue={updateFlavourHandler}
            defaultValue={cocktailInfo.flavour}
          /> */}
          <LabelDropdown
            label="flavour"
            name="Flavour Profile*"
            options={flavoursTemplate}
            placeholder="e.g. Coupe"
            updateValue={updateGlassHandler}
            defaultValue={cocktailInfo.glass}
          />
          <LabelDropdown
            label="glass"
            name="Glass Type*"
            options={optionsTemplate}
            placeholder="e.g. Coupe"
            updateValue={updateGlassHandler}
            defaultValue={cocktailInfo.glass}
          />
        </div>
        <div className={classes.firstGroup_right}>
          <div className={classes.imageContainer}>
            {cocktailImage}
            {cocktailButton}
          </div>
        </div>
      </div>
      <div className={classes.secondGroup}>
        <LabelInput
          label="garnish"
          name="Garnish"
          placeholder="e.g. Cherry"
          updateValue={updateGarnishHandler}
          defaultValue={cocktailInfo.garnish}
        />
        <LabelInput
          label="name"
          name="Author"
          placeholder="e.g. Neil Barry"
          updateValue={updateAuthorHandler}
          defaultValue={cocktailInfo.author}
        />
      </div>
      <IngredientForm />
      <MethodForm />
      <PageBreak />
      <div className={classes.btnContainer}>
        <Button onClick={submitFormHandler}>
          {loading ? <LoadingSpinner /> : 'submit'}
        </Button>
        <Button type="alt" onClick={() => null}>
          Log State
        </Button>
      </div>
      {deleteButton}
    </Tile>
  );
};

export default AddCocktailBox;
