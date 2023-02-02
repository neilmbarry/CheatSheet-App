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
import { useEffect } from 'react';
import { BASE_URL } from '../../../config/BASE_URL';
import SearchBar from './SearchBar';

const SearchResults = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [faves, setFaves] = useState();
  const [totalPages, setTotalPages] = useState(null);
  const [sortBy, setSortBy] = useState('Name');

  // console.log('sortBy: ', sortBy);

  const isOpen = useSelector((state) => state.config.value.openSearchResults);
  // const userId = useSelector((state) => state.config.value.id);
  const query = useSelector((state) => state.config.value.searchQuery);

  const token = useSelector((state) => state.config.value.token);
  const userId = useSelector((state) => state.config.value.id);

  const closeHandler = () => {
    store.dispatch(configActions.setOpenSearchResults(false));
  };

  const fetchFaves = () => {
    if (!token) return;
    const headers = {
      'Content-Type': 'application/json',
    };

    headers['Authorization'] = `Bearer ${token}`;

    fetch(BASE_URL + `users/getFaves`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFaves(data.faves.map((fav) => fav._id));
      });
  };

  const { data, loading, fetchRequest } = useFetch('cocktails');

  useEffect(() => {
    if (!data) return;
    setTotalPages(Math.ceil(data.results / 3));
    setCurrentPage(data.page);
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
    // if (!query.searchQuery) return;
    fetchRequest({});
  }, [query]);

  // console.log('loading?', loading);

  const loadingJSX = loading && (
    <>
      <div className={classes.spinnerContainer}>
        <LoadingSpinner type="dark" />
      </div>
    </>
  );

  const results = data?.cocktails?.map((cocktail) => (
    <Result
      cocktail={cocktail}
      key={cocktail.id}
      slug={cocktail.slug}
      createdBy={cocktail.createdBy}
      fave={faves?.includes(cocktail.id)}
      refreshFaves={fetchFaves}
      isAuthor={cocktail.createdBy === userId}
    />
  ));

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
            <SearchBar />
            <ResultsBar
              results={data?.results}
              sortHandler={setSortBy}
              sortBy={sortBy}
            />
            <Pagination
              totalPages={totalPages}
              currPage={currentPage}
              loading={loading}
              changePageHandler={(page) => {
                if (loading) return;
                setCurrentPage(page);
              }}
            />
            <div className={classes.results}>
              {loadingJSX}
              {results}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
