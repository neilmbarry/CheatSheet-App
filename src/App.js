import classes from './App.module.css';
import NavigationBar from './components/Navigation/NavigationBar';
import { Route } from 'react-router-dom';
import AddCocktail from './components/AddCocktail/AddCocktail';
import { useState } from 'react';
// import CocktailItem from './components/CocktailItem/CocktailItem';
// import CocktailInfo from './components/CocktailInfo/CocktailInfo';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
// import Spinner from './components/UI/Spinner';
import CocktailGrid from './components/CocktailGrid/CocktailGrid';
import SearchResults from './components/SearchResults/SearchResults';
import Footer from './components/Navigation/Footer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { motion } from 'framer-motion/dist/es/index';

function App() {
  console.log('App rendered');

  const [showResults, setShowResults] = useState(false);
  // const [cocktailsDatabase, setCocktailDatabase] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const toggleResults = (e) => {
    console.log(e.target);
    setShowResults((prevState) => !prevState);
  };

  const closeResults = (elem) => {
    if (elem !== null) {
      setShowResults(false);
    }
  };

  const revealResults = () => {
    setShowResults(true);
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

  return (
    <div className={classes.app}>
      <NavigationBar
        onSearchClick={revealResults}
        onClick={closeResults}
        onChange={revealResults}
      >
        <Footer>
          <div className={classes.pageContainer}>
            {showResults && (
              <SearchResults
                results={[]}
                onClick={toggleResults}
              ></SearchResults>
            )}

            <Route path="/add-cocktail">
              <AddCocktail />
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
              <CocktailGrid />
              {/* {cocktailsList} */}
            </Route>
          </div>
        </Footer>
      </NavigationBar>
      {/* <NavigationBar></NavigationBar> */}
    </div>
  );
}

export default App;
