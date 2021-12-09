import "./App.css";
import NavigationBar from "./components/Navigation/NavigationBar";
import { Route } from "react-router-dom";
import AddCocktail from "./components/AddCocktail/AddCocktail";
import { useState, useEffect } from "react";
import CocktailItem from "./components/CocktailItem/CocktailItem";
import CocktailInfo from "./components/CocktailInfo/CocktailInfo";
import { useSelector } from "react-redux";

function App() {
  console.log("App rendered");
  const cocktailsDatabase = useSelector((state) => state.cocktails);

  console.log(cocktailsDatabase);
  // const [cocktails, setCocktails] = useState(DUMMY_DATA);
  const removeCocktailHandler = (id) => {
    // const updatedCocktails = cocktails.filter((cocktail) => {
    //   return cocktail.id !== id;
    // });
    // setCocktails(updatedCocktails);
    return;
  };
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
  return (
    <>
      <NavigationBar>
        <Route path="/add-cocktail">
          <AddCocktail onAddCocktail={addCocktailHandler} />
        </Route>
        <Route path="/login">Login / Signup</Route>
        <Route path="/cocktails/:id">
          Cocktail Info
          <CocktailInfo cocktailInfo={{}} />
        </Route>
        <Route path="/" exact>
          {cocktailsList}
          {/* <CocktailItem
            cocktailInfo={{
              name: "Old Fashioned",
              type: "Sprit Forward",
              glass: "Rocks",
              ingredients: "Bourbon, Bitters, Sugar",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/15-09-26-RalfR-WLC-0084.jpg/1200px-15-09-26-RalfR-WLC-0084.jpg",
            }}
          /> */}
        </Route>
      </NavigationBar>
    </>
  );
}

export default App;
