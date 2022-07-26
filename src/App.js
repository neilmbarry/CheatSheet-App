import classes from './App.module.css';
import NavigationBar from './components/Navigation/NavigationBar';
import { Route, useLocation, Switch } from 'react-router-dom';
import AddCocktail from './components/AddCocktail/AddCocktail';
import { useState } from 'react';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

import CocktailGrid from './components/CocktailGrid/CocktailGrid';
import SearchResults from './components/SearchResults/SearchResults';
import Footer from './components/Navigation/Footer';

import dummy from './store/dummyCocktail.json';
import store from './store/store';
import Result from './components/SearchResults/Result';
import { AnimatePresence } from 'framer-motion';
import Favoutites from './components/Favourties/Favourites';

function App() {
  console.log('App rendered');
  // console.log(dummy);
  const location = useLocation();

  const [showResults, setShowResults] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  // const [cocktailsDatabase, setCocktailDatabase] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const toggleResults = (e) => {
    // console.log(e.target);
    setShowResults((prevState) => !prevState);
  };

  const toggleFavourties = () => {
    setFavourites(getFavList());
    closeResults();
    setShowFavourites((prev) => !prev);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  const closeFaves = () => {
    setShowFavourites(false);
  };

  const closeAll = () => {
    setShowFavourites(false);
    setShowResults(false);
  };

  const fetchResults = () => {
    setResults(store.getState().cocktails.value.cocktails);
    closeFaves();
    setShowResults(true);
  };

  const getFavList = () => {
    return store.getState().cocktails.value.faves;
  };

  // const cocktailsList = cocktailsDatabase.map((item) => {
  //   return <CocktailItem cocktailInfo={item} key={item.name} />;
  // });

  // const fetchCocktails = () => {
  //   console.log('here');
  //   fetch('http://127.0.0.1:8000/api/v1/cocktails', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(1);
  //       setCocktailDatabase(data.cocktails);
  //       console.log(2);
  //       setIsLoading(false);
  //       console.log(3);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(fetchCocktails, []);

  // fetchInfo();

  const searchResults = (
    <SearchResults results={[]} onClick={closeAll}>
      {results.map((res, i) => {
        const faveSlugs = getFavList();
        return (
          <Result
            name={res.name}
            tags={[res.ingredients[0].type, res.flavour, res.glass]}
            rating={4.9}
            reviews={23}
            key={i}
            image={res.image}
            slug={res.slug}
            isAuthor={true}
            fave={faveSlugs.includes(res.slug)}
            onClick={closeAll}
          />
        );
      })}
    </SearchResults>
  );

  const favouriteResults = (
    <Favoutites onClose={toggleFavourties} results={favourites} />
  );

  return (
    <div className={classes.app}>
      <NavigationBar
        onSearchClick={fetchResults}
        // onClick={closeAll}
        onChange={fetchResults}
        onSearch={fetchResults}
        toggleFav={toggleFavourties}
      />
      <div className={classes.pageContainer}>
        <AnimatePresence>{showResults && searchResults}</AnimatePresence>
        <AnimatePresence>{showFavourites && favouriteResults}</AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path="/add-cocktail">
              <AddCocktail
                title="Create a cocktail"
                subtitle="Fill in required fields to add a cocktail."
              />
            </Route>
            <Route path="/modify-cocktail/:slug">
              <AddCocktail
                title="Modify your cocktail"
                subtitle="Update your chosen fields."
              />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/cocktails/:slug">
              <CocktailGrid />
            </Route>
            <Route path="/" exact>
              {/* {isLoading ? <Spinner /> : null} */}
              {/* <CocktailGrid /> */}
              {/* {cocktailsList} */}
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <Footer />

      {/* <NavigationBar></NavigationBar> */}
    </div>
  );
}

export default App;
