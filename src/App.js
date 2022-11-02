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
import Favoutites from './components/Navigation/Favourites/Favourites';
import Home from './pages/Home/Home';
import Modal from './components/UI/Modal';
import PageContainer from './pages/PageContainer';

import { AnimatePresence } from 'framer-motion';
import useFetch from './hooks/useFetch';
import { useFetch2 } from './hooks/useFetch';

import classes from './App.module.css';

function App() {
  console.log('App rendered');
  const location = useLocation();
  const modal = useSelector((state) => state.config.value.modal);

  const { data, loading, error } = useFetch({
    url: 'cocktails',
  });

  // const { data2, loading2, error2 } = useFetch2(
  //   'http://127.0.0.1:8000/api/v1/cocktails'
  // );

  console.log(data);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/api/v1/cocktails')
  //     .then((res) => res.json())
  //     .then((data) => null)
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Close Faves and SearchResults
  }, [location.pathname]);

  return (
    <div className={classes.app}>
      <NavigationBar />
      <PageContainer>
        {/* <SearchResults /> */}
        {/* <Favoutites /> */}
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path="/add-cocktail">
              <AddCocktailPage title="ADD COCKTAIL" type="Add" />
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
