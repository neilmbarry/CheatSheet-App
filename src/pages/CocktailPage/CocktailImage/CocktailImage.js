import React from 'react';
import classes from './CocktailImage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../../hooks/useFetch';
import { apiEndpoint } from '../../../config/apiEndpoint';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/UI/Spinner';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const CocktailImage = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;
  const [faves, setFaves] = useState([]);
  const token = useSelector((state) => state.config.value.token);
  const fetchCurrentFaves = () => {
    if (!token) return;
    const headers = {
      'Content-Type': 'application/json',
    };

    headers['Authorization'] = `Bearer ${token}`;

    fetch(apiEndpoint() + `users/getFaves`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFaves(data.faves.map((fav) => fav._id));
      });
  };

  useEffect(() => {
    console.log('using effetc');
    fetchCurrentFaves();
  }, []);

  // const isFave = data?.faves?.includes(cocktail?.id);

  if (loading) {
    return (
      <div className={`${classesList} ${classes.loading}`}>
        <LoadingSpinner />
      </div>
    );
  }

  const toggleFaveHandler = () => {
    if (!token) {
      return store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: 'You must be signed in to add a favourite!',
        })
      );
    }
    console.log(cocktail.id);
    const body = JSON.stringify({
      cocktailId: cocktail.id,
    });

    const url = `${apiEndpoint()}users/toggleFave`;
    fetch(url, {
      method: 'PATCH',
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
        fetchCurrentFaves();
        if (data.faveAdded) {
          return store.dispatch(
            configActions.setNotification({
              type: 'success',
              message: 'Added to favourites!',
            })
          );
        }
        //
        store.dispatch(
          configActions.setNotification({
            type: 'info',
            message: 'Removed from favourites!',
          })
        );
        // FETCH CURRENT FAVES

        // setShowSuccessModal(true);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className={classesList}>
      <div className={classes.favIcon} onClick={() => toggleFaveHandler()}>
        {faves.includes(cocktail?.id) ? (
          <FontAwesomeIcon icon={faHeart} />
        ) : (
          <FontAwesomeIcon icon={faHeartEmpty} />
        )}
      </div>
      <img src={cocktail?.image} alt="" className={classes.image} />
    </div>
  );
};

export default CocktailImage;
