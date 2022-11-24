import React from 'react';
import classes from './SearchResults.module.css';
import Result from './Result';
import { AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../UI/Spinner';

import { motion } from 'framer-motion';

import useFetch from '../../../hooks/useFetch';

import {
  searchResultsVariants,
  backdropVariants,
} from '../../../config/animationVariants';
import { useSelector } from 'react-redux';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import ResultsBar from './ResultsBar';
import Backdrop from '../../UI/Backdrop';
import Pagination from './Pagination';

const SearchResults = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  const isOpen = useSelector((state) => state.config.value.openSearchResults);
  const userId = useSelector((state) => state.config.value.id);
  const query = useSelector((state) => state.config.value.searchQuery);

  const closeHandler = () => {
    store.dispatch(configActions.setOpenSearchResults(false));
  };

  const { data, loading } = useFetch({
    url: 'cocktails',
    query,
    reload: isOpen === true,
  });

  const results = loading ? (
    <>
      <div className={classes.spinnerContainer}>
        <LoadingSpinner type="dark" />
      </div>
    </>
  ) : (
    data.cocktails.map((cocktail) => (
      <Result
        cocktail={cocktail}
        name={cocktail.name}
        tags={[cocktail.ingredients[0].name, cocktail.flavour, cocktail.glass]}
        rating={4.9}
        reviews={23}
        key={cocktail.id}
        image={cocktail.image}
        slug={cocktail.slug}
        createdBy={cocktail.createdBy}
        isAuthor={cocktail.createdBy === userId}
        // fave={faveSlugs.includes(cocktail.slug)}
        onClick={null}
      />
    ))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={closeHandler}>
          <motion.div
            variants={searchResultsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classesList}
          >
            <ResultsBar results={data?.results} />
            <div className={classes.results}>{results}</div>

            <Pagination pages={2} />
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
