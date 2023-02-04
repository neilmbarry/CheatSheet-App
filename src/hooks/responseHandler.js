import configActions from '../store/configSlice';
import createCocktailActions from '../store/createCocktailSlice';
import store from '../store/store';

export const responseHandler = (response) => {
  const { data, error } = response;
  if (!data.status) return;
  if (data.status === 'success') {
    console.log(data);
    store.dispatch(configActions.setUserFaves(data.user.faves));
    if (data.faveAdded) {
      return store.dispatch(
        configActions.setNotification({
          type: 'success',
          message: 'Added to favourites!',
        })
      );
    }
    store.dispatch(
      configActions.setNotification({
        type: 'info',
        message: 'Removed from favourites!',
      })
    );
  }
};

export const faveResponseHandler = (response) => {
  const { data, error } = response;

  if (!data.status) return;
  console.log('In Fave response handler');
  if (data.status === 'success') {
    store.dispatch(configActions.setUserFaves(data.user.faves));
    if (data.faveAdded) {
      return store.dispatch(
        configActions.setNotification({
          type: 'success',
          message: 'Added to favourites!',
        })
      );
    }
    store.dispatch(
      configActions.setNotification({
        type: 'info',
        message: 'Removed from favourites!',
      })
    );
  }
  if (error) {
    return store.dispatch(
      configActions.setNotification({
        type: 'fail',
        message: error,
      })
    );
  }
};

export const createModifyResponseHandler = (response) => {
  const { data, error } = response;
  if (!data.status) return;
  // Got cocktail from slug to update
  if (data.message === 'Got cocktail!') {
    store.dispatch(createCocktailActions.updateCocktail(data.cocktail));
    store.dispatch(createCocktailActions.setOriginalName(data.cocktail.name));
    return;
  }
  // Successful created cocktail
  if (data.newCocktail) {
    store.dispatch(
      configActions.setNotification({
        type: 'success',
        message: response.data.message,
      })
    );
    // Redirect
    return data.newCocktail.slug;
  }
  // Successful updated cocktail
  if (data.updatedCocktail) {
    console.log(data);
    store.dispatch(
      configActions.setNotification({
        type: 'success',
        message: response.data.message,
      })
    );
    // Redirect
    return data.updatedCocktail.slug;
  }
  if (error) {
    return store.dispatch(
      configActions.setNotification({
        type: 'fail',
        message: error,
      })
    );
  }
};

export const reviewResponseHandler = (response) => {
  const { data, error } = response;
  if (!data.status) return;
  if (data.status === 'success') {
    console.log(data);
    return store.dispatch(
      configActions.setNotification({
        type: 'success',
        message: 'Added review!',
      })
    );
  }
  return store.dispatch(
    configActions.setNotification({
      type: 'error',
      message: error,
    })
  );
};
