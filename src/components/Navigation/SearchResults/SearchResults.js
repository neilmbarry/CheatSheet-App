// Main imports
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import ResultsBar from './ResultsBar';
import Backdrop from '../../UI/Backdrop';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Result from './Result';
import LoadingSpinner from '../../UI/Spinner';

// Styles
import classes from './SearchResults.module.css';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { searchResultsVariants } from '../../../config/animationVariants';

// State management
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import useFetch from '../../../hooks/useFetch';

// Config
import { BASE_URL } from '../../../config/BASE_URL';

const SearchResults = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('Name');

  const isOpen = useSelector((state) => state.config.value.openSearchResults);

  const query = useSelector((state) => state.config.value.searchQuery);

  const token = useSelector((state) => state.config.value.token);
  const userId = useSelector((state) => state.config.value.id);

  const closeHandler = () => {
    store.dispatch(configActions.setOpenSearchResults(false));
  };

  const { response, fetchRequest } = useFetch('cocktails');

  useEffect(() => {
    if (!response.data.status) return;
    setTotalPages(Math.ceil(response.data.results / 3) || 1);
    setCurrentPage(response.data.page);
  }, [response]);

  useEffect(() => {
    setCurrentPage(1);
    if (!query) return;
    fetchRequest({
      filters: {
        query,
        page: 1,
        limit: 4,
        sort: sortBy,
      },
    });
  }, [query, sortBy]);

  useEffect(() => {
    if (!query) return;
    fetchRequest({
      filters: {
        query,
        page: currentPage,
        limit: 4,
        sort: sortBy,
      },
    });
  }, [currentPage]);

  const loadingJSX = response.loading && (
    <>
      <div className={classes.spinnerContainer}>
        <LoadingSpinner type="dark" />
      </div>
    </>
  );

  const results =
    !response.loading &&
    response.data?.cocktails?.map((cocktail) => (
      <Result
        cocktail={cocktail}
        key={cocktail.id}
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
              results={response.data?.results}
              sortHandler={setSortBy}
              sortBy={sortBy}
              searchTerm={query}
            />
            <Pagination
              totalPages={totalPages}
              currPage={currentPage}
              loading={response.loading}
              changePageHandler={(page) => {
                if (response.loading) return;
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
