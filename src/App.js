import classes from './App.module.css';
import NavigationBar from './components/Navigation/NavigationBar';
import { Route } from 'react-router-dom';
import AddCocktail from './components/AddCocktail/AddCocktail';
import { useState, useEffect } from 'react';
import CocktailItem from './components/CocktailItem/CocktailItem';
import CocktailInfo from './components/CocktailInfo/CocktailInfo';
import Login from './components/Login/Login';
import Spinner from './components/UI/Spinner';
import CocktailGrid from './components/CocktailGrid/CocktailGrid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { motion } from 'framer-motion/dist/es/index';

function App() {
  console.log('App rendered');

  const [cocktailsDatabase, setCocktailDatabase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const cocktailsList = cocktailsDatabase.map((item) => {
  //   return <CocktailItem cocktailInfo={item} key={item.name} />;
  // });

  const fetchCocktails = () => {
    console.log('here');
    fetch('http://127.0.0.1:8000/api/v1/cocktails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(1);
        setCocktailDatabase(data.cocktails);
        console.log(2);
        setIsLoading(false);
        console.log(3);
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchCocktails, []);

  // fetchInfo();

  return (
    <div className={classes.app}>
      <NavigationBar>
        <Route path="/add-cocktail">
          <AddCocktail />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cocktails/:slug">
          <CocktailInfo />
        </Route>
        <Route path="/" exact>
          {isLoading ? <Spinner /> : null}
          {/* <i className="fa-solid fa-heart"></i> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-heart" /> */}
          {/* <motion.div layout> */}

          {/* {cocktailsDatabase.map((cocktail) => {
            return <CocktailItem cocktailInfo={cocktail} key={cocktail.name} />;
          })} */}
          <CocktailGrid />
        </Route>
      </NavigationBar>
      {/* <NavigationBar></NavigationBar> */}
    </div>
  );
}

export default App;
