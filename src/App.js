import { Route, useLocation, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NavigationBar from './components/Navigation/NavigationBar';
import AddCocktailPage from './pages/AddCocktail/AddCocktailPage';
import Login from './pages/Authentication/Login/Login';
import SignUp from './pages/Authentication/SignUp/SignUp';
import Account from './pages/Account/Account';
import CocktailGrid from './pages/CocktailPage/CocktailGrid';
import SearchResults from './components/Navigation/SearchResults/SearchResults';
import Footer from './components/Navigation/Footer';
import Favourites from './components/Navigation/Favourites/Favourites';
import Home from './pages/Home/Home';
import Modal from './components/UI/Modal';
import PageContainer from './pages/PageContainer';

import { AnimatePresence } from 'framer-motion';

import configActions from './store/configSlice';
import createCocktailActions from './store/createCocktailSlice';

import classes from './App.module.css';
import store from './store/store';
import { apiEndpoint } from './config/apiEndpoint';
import Notification from './components/UI/Notifications/Notification';

function App() {
  console.log('App rendered');
  const location = useLocation();
  const page = useLocation().pathname;
  const modal = useSelector((state) => state.config.value.modal);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Close Faves and SearchResults
    store.dispatch(configActions.setOpenFavourites(false));
    store.dispatch(configActions.setOpenSearchResults(false));
    store.dispatch(configActions.setModal(null));
    store.dispatch(createCocktailActions.resetCocktail());
  }, [page]);

  useEffect(() => {
    fetch(apiEndpoint() + 'cocktails?fields=slug')
      .then((res) => res.json())
      .then((data) =>
        store.dispatch(
          configActions.setSlugList(data.cocktails.map((el) => el.slug))
        )
      );
  }, []);

  return (
    <div className={classes.app}>
      <NavigationBar />
      <PageContainer>
        <SearchResults />
        <Favourites />
        <Modal type={modal} />
        <Notification />

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path="/add-cocktail">
              <AddCocktailPage title="Add a cocktail" type="Add" />
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
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </AnimatePresence>
      </PageContainer>
      <Footer />
    </div>
  );
}

export default App;
