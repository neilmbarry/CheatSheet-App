import configActions from '../store/configSlice';
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
