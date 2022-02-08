import "./App.css";
import NavigationBar from "./components/Navigation/NavigationBar";
import { Route } from "react-router-dom";
import AddCocktail from "./components/AddCocktail/AddCocktail";
import { useState, useEffect } from "react";
import CocktailItem from "./components/CocktailItem/CocktailItem";
import CocktailInfo from "./components/CocktailInfo/CocktailInfo";
import { useSelector } from "react-redux";
import Login from "./components/Login/Login";

function App() {
  console.log("App rendered");
  const [cocktailsDatabase, setCocktailDatabase] = useState([]);
  // const cocktailsDatabase = useSelector((state) => state.cocktails);

  // console.log(cocktailsDatabase);
  // const [cocktails, setCocktails] = useState(DUMMY_DATA);
  const removeCocktailHandler = (id) => {
    // const updatedCocktails = cocktails.filter((cocktail) => {
    //   return cocktail.id !== id;
    // });
    // setCocktails(updatedCocktails);
    return;
  };

  // Below is just a test to see if I can implement the fetch API

  // ------ END OF TEST ------ //

  console.log(cocktailsDatabase);

  const cocktailsList = cocktailsDatabase.map((item) => {
    return (
      <CocktailItem
        cocktailInfo={item}
        key={item.name}
        onRemoveCocktail={removeCocktailHandler}
      />
    );
  });

  const addCocktailHandler = (cocktailItem) => {
    // console.log("here");
    // setCocktails((prevList) => {
    //   const newList = prevList.slice();
    //   newList.push(cocktailItem);
    //   return newList;
    // });
  };

  useEffect(
    fetch("http://127.0.0.1:8000/api/v1/cocktails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCocktailDatabase(data.cocktails);
        console.log(data.cocktails);
      })
      .catch((err) => console.log(err)),
    []
  );

  return (
    <>
      <NavigationBar>
        <Route path="/add-cocktail">
          <AddCocktail onAddCocktail={addCocktailHandler} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cocktails/:id">
          Cocktail Info
          <CocktailInfo cocktailInfo={{}} />
        </Route>
        <Route path="/" exact>
          {cocktailsList}
        </Route>
      </NavigationBar>
    </>
  );
}

export default App;
