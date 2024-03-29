import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import classes from './FaveIcon.module.css';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import { faveResponseHandler } from '../../../hooks/responseHandler';

const FaveIcon = ({ className, cocktailId }) => {
  const classesList = `${classes.main} ${className}`;
  const token = useSelector((state) => state.config.value.token);
  const userFaves = useSelector((state) => state.config.value.userFaves);

  const isFave = userFaves.includes(cocktailId);

  let { response, fetchRequest } = useFetch('users/toggleFave');

  const toggleFave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (response.loading) return;
    if (!token) {
      return store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: 'You must be signed in to add a favourite!',
        })
      );
    }
    fetchRequest({
      method: 'PATCH',
      token,
      body: { cocktailId },
    });
  };

  useEffect(() => {
    if (!response.data.status) return;
    faveResponseHandler(response);
    response.data.status = null;
  }, [response]);
  return (
    <div className={classes.icon + ' ' + classes.fav} onClick={toggleFave}>
      {isFave ? (
        <FontAwesomeIcon icon={faHeartFull} />
      ) : (
        <FontAwesomeIcon icon={faHeart} />
      )}
    </div>
  );
};

export default FaveIcon;
