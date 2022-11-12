import { Route, useLocation, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NavigationBar from './components/Navigation/NavigationBar';
import AddCocktailPage from './pages/AddCocktail/AddCocktailPage';
import Login from './pages/Authentication/Login/Login';
import SignUp from './pages/Authentication/SignUp/SignUp';
import CocktailGrid from './pages/CocktailPage/CocktailGrid';
import SearchResults from './components/Navigation/SearchResults/SearchResults';
import Footer from './components/Navigation/Footer';
import Favourites from './components/Navigation/Favourites/Favourites';
import Home from './pages/Home/Home';
import Modal from './components/UI/Modal';
import PageContainer from './pages/PageContainer';

import { AnimatePresence } from 'framer-motion';
import useFetch from './hooks/useFetch';
import configActions from './store/configSlice';
import createCocktailActions from './store/createCocktailSlice';

import classes from './App.module.css';
import store from './store/store';

function App() {
  console.log('App rendered');
  const location = useLocation();
  const modal = useSelector((state) => state.config.value.modal);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Close Faves and SearchResults
    store.dispatch(configActions.setOpenFavourites(false));
    store.dispatch(configActions.setOpenSearchResults(false));
    store.dispatch(createCocktailActions.resetCocktail());
  }, [location.pathname]);

  return (
    <div className={classes.app}>
      <NavigationBar />
      <PageContainer>
        <SearchResults />
        <Favourites />

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path="/add-cocktail">
              <AddCocktailPage title="Create a cocktail" type="Add" />
            </Route>
            <Route path="/modify-cocktail/:slug">
              <AddCocktailPage title="Modify your cocktail" type="Modify" />
            </Route>
            <Route path="/cocktails/:slug">
              <CocktailGrid />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </AnimatePresence>
      </PageContainer>
      <Footer />
      <Modal type={modal} />
    </div>
  );
}

export default App;
