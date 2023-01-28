import React, { useEffect } from 'react';
import classes from './AddCocktailBox.module.css';

// import { usePrompt } from 'react-router-dom';

import Tile from '../../../components/UI/Tile/Tile';
import LabelInput from '../LabelInput/LabelInput';
import LabelDropdown from '../LabelInput/LabelDropdown';
import Button from '../../../components/UI/Button';
import IngredientForm from '../IngredientForm/IngredientForm';
import MethodForm from '../MethodForm/MethodForm';
import LoadingSpinner from '../../../components/UI/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';
import createCocktailActions from '../../../store/createCocktailSlice';
import configActions from '../../../store/configSlice';
import PageBreak from '../../../components/UI/PageBreak';
import { useSelector } from 'react-redux';
import store from '../../../store/store';
import { useCallback } from 'react';
import DeleteButton from '../../../components/UI/DeleteButton';

import { flavourOptions } from '../../../config/dropdownOptions/flavourOptions';
import { glassOptions } from '../../../config/dropdownOptions/glassOptions';
import { BASE_URL } from '../../../config/BASE_URL';
import { useParams } from 'react-router';
import { useState } from 'react';

const AddCocktailBox = ({ className, remove, title, subtitle }) => {
  const classesList = `${classes.main} ${className}`;
  const cocktailInfo = useSelector((state) => state.create.value);
  const token = useSelector((state) => state.config.value.token);

  const [loading, setLoading] = useState(false);
  const [validName, setValidName] = useState(null);

  const slug = useParams().slug;

  const submitFormHandler = () => {
    const body = JSON.stringify(cocktailInfo);
    console.log(cocktailInfo);

    const url = `${BASE_URL}cocktails${slug ? '/' + cocktailInfo._id : ''}`;
    fetch(url, {
      method: slug ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        store.dispatch(configActions.setModal('addReview'));
        store.dispatch(
          configActions.setNotification({
            type: 'success',
            message: 'Cocktail Added!',
          })
        );
        // setShowSuccessModal(true);
      })
      .catch((err) => console.warn(err));
  };

  const deleteCocktailHandler = () => {
    const url = `${BASE_URL}cocktails/${cocktailInfo._id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((data) => {
        console.log(data, 'successful delete');
        store.dispatch(configActions.setModal('successDelete'));
        // setShowSuccessModal(true);
      })
      .catch((err) => console.warn(err));
  };

  const updateHandler = useCallback((action, value) => {
    store.dispatch(createCocktailActions[action](value));
  }, []);

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

  // usePrompt('Hello from usePrompt -- Are you sure you want to leave?', true);

  useEffect(() => {
    if (!slug) return;
    console.log(slug);
    fetch(`${BASE_URL}cocktails/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const cocktail = data.cocktail;

        store.dispatch(createCocktailActions.updateCocktail(cocktail));
      })
      .catch((err) => console.error(err));
  }, [slug]);

  const tileTitle = title === 'Add' ? 'Add a cocktail' : 'Modify your cocktail';

  const nameCheck = async (name) => {
    setValidName(null);
    setLoading(true);
    const res = await fetch(BASE_URL + 'cocktails?name=' + name);
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.results) return setValidName('invalid');
    setValidName('valid');
  };

  return (
    <Tile className={classesList} title={tileTitle}>
      <div className={classes.firstGroup}>
        <div className={classes.firstGroup_left}>
          <LabelInput
            label="cocktail"
            name="Cocktail Name*"
            placeholder="e.g. Old Fashioned"
            // updateValue={(name) => updateHandler('changeName', name)}
            updateValue={(name) => nameCheck(name)}
            defaultValue={cocktailInfo.name}
            required={true}
            loading={loading}
            valid={validName}
          />
          <LabelDropdown
            label="flavour"
            name="Flavour Profile*"
            options={flavourOptions}
            placeholder="e.g. Coupe"
            updateValue={(flavour) => updateHandler('changeFlavour', flavour)}
            defaultValue={cocktailInfo.flavour}
            required={true}
          />
          <LabelDropdown
            label="glass"
            name="Glass Type*"
            options={glassOptions}
            placeholder="e.g. Coupe"
            updateValue={(glass) => updateHandler('changeGlass', glass)}
            defaultValue={cocktailInfo.glass}
            required={true}
          />
          {/* <FormDropdown options={['neil', 'barry']} /> */}
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
          updateValue={(garnish) => updateHandler('changeGarnish', garnish)}
          defaultValue={cocktailInfo.garnish}
        />
        <LabelInput
          label="name"
          name="Author"
          placeholder="e.g. Neil Barry"
          updateValue={(author) => updateHandler('changeAuthor', author)}
          defaultValue={cocktailInfo.author}
        />
      </div>
      <IngredientForm />
      <MethodForm />
      <PageBreak />
      <div className={classes.btnContainer}>
        <Button type="main" onClick={submitFormHandler}>
          {loading ? <LoadingSpinner /> : 'update'}
        </Button>
        <Button type="alt" onClick={() => deleteCocktailHandler()}>
          Delete Cocktail
        </Button>
      </div>
      {/* {deleteButton} */}
    </Tile>
  );
};

export default AddCocktailBox;
