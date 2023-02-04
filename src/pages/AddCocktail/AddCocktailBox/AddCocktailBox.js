// Main imports
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

// Styles
import classes from './AddCocktailBox.module.css';

// Components
import Tile from '../../../components/UI/Tile/Tile';
import LabelInput from '../LabelInput/LabelInput';
import LabelDropdown from '../LabelInput/LabelDropdown';
import Button from '../../../components/UI/Button';
import IngredientForm from '../IngredientForm/IngredientForm';
import MethodForm from '../MethodForm/MethodForm';
import PageBreak from '../../../components/UI/PageBreak';
import ImageContainer from './ImageContainer';

// State Management
import store from '../../../store/store';
import createCocktailActions from '../../../store/createCocktailSlice';
import configActions from '../../../store/configSlice';

// Config
import { flavourOptions } from '../../../config/dropdownOptions/flavourOptions';
import { glassOptions } from '../../../config/dropdownOptions/glassOptions';
import { BASE_URL } from '../../../config/BASE_URL';
import useFetch from '../../../hooks/useFetch';
import { trimCocktailInputs } from '../../../config/trimCocktailInputs';
import { invalidCocktailItems } from '../../../config/invalidCocktailItems';
import { createModifyResponseHandler } from '../../../hooks/responseHandler';

const AddCocktailBox = ({ className, title, type }) => {
  const classesList = `${classes.main} ${className}`;
  const cocktailInfo = useSelector((state) => state.create.value);
  const token = useSelector((state) => state.config.value.token);
  const navigate = useNavigate();
  const [validName, setValidName] = useState(null);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  let { response, fetchRequest } = useFetch(
    `cocktails${slug ? '/' + slug : ''}`
  );

  const submitFormHandler = () => {
    if (loading) return;
    const trimmedCocktail = trimCocktailInputs(cocktailInfo);
    const invalidItems = invalidCocktailItems(trimmedCocktail);
    store.dispatch(createCocktailActions.setInvalidItems(invalidItems));
    if (invalidItems.length) {
      return;
    }
    const body = cocktailInfo;
    fetchRequest({
      method: 'POST',
      body,
      token,
    });
  };

  const deleteCocktailHandler = () => {
    // Confirm Delete
    fetchRequest({
      method: 'DELETE',
      token,
    });
  };

  const updateCocktailHandler = () => {
    if (loading) return;
    const trimmedCocktail = trimCocktailInputs(cocktailInfo);
    const invalidItems = invalidCocktailItems(trimmedCocktail);
    store.dispatch(createCocktailActions.setInvalidItems(invalidItems));
    if (invalidItems.length) {
      return;
    }
    const body = cocktailInfo;
    fetchRequest({
      method: 'PATCH',
      token,
      body,
    });
  };

  const updateHandler = useCallback((action, value) => {
    store.dispatch(createCocktailActions[action](value));
  }, []);

  const fetchCocktailInfo = () => {
    fetchRequest({});
  };

  useEffect(() => {
    if (type === 'Modify') {
      if (!slug) {
        return navigate('/');
      }
      fetchCocktailInfo();
    }
  }, [navigate, slug, type]);

  useEffect(() => {
    console.log('RESPONSE', response);
    const redirect = createModifyResponseHandler(response);
    if (redirect) {
      console.log(redirect);
      navigate(`/cocktails/${redirect}`);
    }
    response.data.status = null;
  }, [response, navigate]);

  const nameCheck = async (name) => {
    setValidName(null);
    if (!name) return setValidName('invalid');
    if (name === cocktailInfo.originalName) {
      setValidName('valid');
      return updateHandler('changeName', name);
    }
    setLoading(true);
    const res = await fetch(BASE_URL + 'cocktails?name=' + name);
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.results) return setValidName('invalid');
    setValidName('valid');
    return updateHandler('changeName', name);
  };

  return (
    <Tile className={classesList} title={title}>
      <div className={classes.firstGroup}>
        <div className={classes.firstGroup_left}>
          <LabelInput
            label="cocktail"
            name="Cocktail Name*"
            placeholder="e.g. Old Fashioned"
            updateValue={(name) => nameCheck(name)}
            defaultValue={cocktailInfo.name}
            required={true}
            loading={loading}
            valid={validName}
            invalid={cocktailInfo.invalidItems?.includes('name')}
          />
          <LabelDropdown
            label="flavour"
            name="Flavour Profile*"
            options={flavourOptions}
            placeholder="e.g. Coupe"
            updateValue={(flavour) => updateHandler('changeFlavour', flavour)}
            defaultValue={cocktailInfo.flavour}
            required={true}
            invalid={cocktailInfo.invalidItems?.includes('flavour')}
          />
          <LabelDropdown
            label="glass"
            name="Glass Type*"
            options={glassOptions}
            placeholder="e.g. Coupe"
            updateValue={(glass) => updateHandler('changeGlass', glass)}
            defaultValue={cocktailInfo.glass}
            required={true}
            invalid={cocktailInfo.invalidItems?.includes('glass')}
          />
        </div>
        <div className={classes.firstGroup_right}>
          <ImageContainer />
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
      <IngredientForm
        invalid={cocktailInfo.invalidItems?.includes('ingredients')}
      />
      <MethodForm invalid={cocktailInfo.invalidItems?.includes('method')} />
      <PageBreak />
      <div className={classes.btnContainer}>
        <Button
          type="main"
          onClick={
            type === 'Modify' ? updateCocktailHandler : submitFormHandler
          }
          loading={response.loading}
        >
          {type === 'Modify' ? 'update' : 'submit'}
        </Button>
        <Button type="alt" onClick={() => deleteCocktailHandler()}>
          {type === 'Modify' ? 'delete' : 'cancel'}
        </Button>
      </div>
    </Tile>
  );
};

export default AddCocktailBox;
