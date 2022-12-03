import React from 'react';
import classes from './CocktailImage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../../hooks/useFetch';
import { apiEndpoint } from '../../../config/apiEndpoint';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/UI/Spinner';

const CocktailImage = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  // const { data, loading: loadingData } = useFetch({
  //   url: `users/getFaves`,
  //   reload: true,
  // });

  const token = useSelector((state) => state.config.value.token);

  // const isFave = data?.faves?.includes(cocktail?.id);

  if (loading) {
    return (
      <div className={`${classesList} ${classes.loading}`}>
        <LoadingSpinner />
      </div>
    );
  }

  const toggleFaveHandler = () => {
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
        // setShowSuccessModal(true);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className={classesList}>
      <div className={classes.favIcon} onClick={() => toggleFaveHandler()}>
        {true ? (
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
