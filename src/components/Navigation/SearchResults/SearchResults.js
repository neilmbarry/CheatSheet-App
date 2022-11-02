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

const SearchResults = ({ className, children, onClick }) => {
  const classesList = `${classes.main} ${className}`;

  const { data, loading } = useFetch({
    url: 'cocktails',
  });

  console.log(data, '<--- DATA');
  console.log(loading, '<--- LOADING');

  const results = loading ? (
    <>
      <h1>Loading...</h1>
      <h1>Loading...</h1>

      <LoadingSpinner type="dark" />
      <h1>herererer...</h1>
      <h1>herererer...</h1>
      <h1>herererer...</h1>
    </>
  ) : (
    data.cocktails.map((cocktail) => (
      <Result
        name={cocktail.name}
        tags={[cocktail.ingredients[0].name, cocktail.flavour, cocktail.glass]}
        rating={4.9}
        reviews={23}
        key={cocktail.id}
        image={cocktail.image}
        slug={cocktail.slug}
        createdBy={cocktail.createdBy}
        // fave={faveSlugs.includes(cocktail.slug)}
        onClick={null}
      />
    ))
  );

  // USE THIS!!! -------------------------
  // {results.map((res, i) => {
  //       const faveSlugs = getFavList();
  //       return (
  //         <Result
  //           name={res.name}
  //           tags={[res.ingredients[0].name, res.flavour, res.glass]}
  //           rating={4.9}
  //           reviews={23}
  //           key={i}
  //           image={res.image}
  //           slug={res.slug}
  //           isAuthor={true}
  //           fave={faveSlugs.includes(res.slug)}
  //           onClick={closeAll}
  //         />
  //       );
  //     })}

  return (
    <AnimatePresence>
      <motion.div
        className={classes.backdrop}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClick}
      >
        <motion.div
          variants={searchResultsVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={classesList}
        >
          <div className={classes.options}>
            <h6>71 matching results for 'paper plane'</h6>
            <div className={classes.dropdown}>
              <h6>Sort by:</h6>
              <select name="" id="">
                <option value="">rating</option>
                <option value="">newest</option>
                <option value="">relevant</option>
              </select>
            </div>
          </div>
          <div className={classes.results}>
            {children}
            {results}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;
