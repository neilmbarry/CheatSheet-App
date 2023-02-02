// Main imports
import { Route, useLocation, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import NavigationBar from './components/Navigation/NavigationBar';
import AddCocktailPage from './pages/AddCocktail/AddCocktailPage';
import Account from './pages/Account/Account';
import CocktailGrid from './pages/CocktailPage/CocktailGrid';
import SearchResults from './components/Navigation/SearchResults/SearchResults';
import Footer from './components/Navigation/Footer';
import Favourites from './components/Navigation/Favourites/Favourites';
import Home from './pages/Home/Home';
import Modal from './components/UI/Modal';
import PageContainer from './pages/PageContainer';
import Notification from './components/UI/Notifications/Notification';
import Menu from './components/Navigation/Menu/Menu';

// Styles
import { AnimatePresence } from 'framer-motion';
import classes from './App.module.css';

// State management
import configActions from './store/configSlice';
import createCocktailActions from './store/createCocktailSlice';
import store from './store/store';

function App() {
  const location = useLocation();
  const page = useLocation().pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
    store.dispatch(configActions.resetPage());
    // Move to clean up function of addCocktail
    store.dispatch(createCocktailActions.resetCocktail());
  }, [page]);

  return (
    <div className={classes.app}>
      <NavigationBar />
      <PageContainer>
        <SearchResults />
        <Favourites />
        <Modal />
        <Notification />
        <Menu />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route
              path="/add-cocktail"
              element={<AddCocktailPage title="Add a cocktail" type="Add" />}
            ></Route>
            <Route
              path="/modify-cocktail/:slug"
              element={
                <AddCocktailPage title="Modify your cocktail" type="Modify" />
              }
            ></Route>
            <Route path="/cocktails/:slug" element={<CocktailGrid />} />
            <Route path="/account" element={<Account />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </AnimatePresence>
      </PageContainer>
      <Footer />
    </div>
  );
}

export default App;
