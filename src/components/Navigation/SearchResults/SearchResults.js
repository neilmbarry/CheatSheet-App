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
import { useState } from 'react';

const SearchResults = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const isOpen = useSelector((state) => state.config.value.openSearchResults);
  // const userId = useSelector((state) => state.config.value.id);
  const query = useSelector((state) => state.config.value.searchQuery);

  const closeHandler = () => {
    store.dispatch(configActions.setOpenSearchResults(false));
  };

  console.warn('SEARCH RESULTS RERENDERED');

  const { data: data2, loading2 } = useFetch({
    url: 'cocktails',
    query,
    neil: true,
  });

  const { data, loading } = useFetch({
    url: 'cocktails',
    query,
    page: currentPage,
    limit: 5,
    // reload: isOpen === true,
    neil: true,
  });

  if (data2?.results) {
    const results = data2.results;
    console.log('results quantity: ', results);
    const pages = Math.ceil(results / 5);
    if (pages > 1) {
      setCurrentPage(1);
    }
  }

  console.log(data2);

  const results = loading ? (
    <>
      <div className={classes.spinnerContainer}>
        <LoadingSpinner type="dark" />
      </div>
    </>
  ) : (
    data?.cocktails?.map((cocktail) => (
      <Result
        cocktail={cocktail}
        key={cocktail.id}
        slug={cocktail.slug}
        createdBy={cocktail.createdBy}
        // isAuthor={cocktail.createdBy === userId}
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
            <ResultsBar results={data2?.results} />
            <div className={classes.results}>{results}</div>
            <Pagination totalPages={totalPages} currPage={currentPage} />
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
