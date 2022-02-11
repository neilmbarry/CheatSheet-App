import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
// import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import Spinner from '../UI/Spinner';

const CocktailInfo = (props) => {
  const [cocktailInfo, setCocktailInfo] = useState();
  const params = useParams();
  // console.log(history.location.pathname);
  // console.log(history);
  console.log(params.slug);
  const fetchCocktail = () => {
    fetch(`
    http://127.0.0.1:8000/api/v1/cocktails?slug=${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cocktails);
        setCocktailInfo(data.cocktails);
      })
      .catch((err) => console.log('ERROR OCCURED', err));
  };
  useEffect(fetchCocktail, [params.slug]);
  // const cocktailInfo = cocktails.find((item) => item.id === +params.id);
  if (!cocktailInfo) {
    return <Spinner />;
  }
  console.log(cocktailInfo);
  console.log(cocktailInfo[0]);
  console.log(cocktailInfo[0].name);
  return (
    <Card>
      <h2>{cocktailInfo[0].name}</h2>
      <h4>{cocktailInfo[0].glassType}</h4>
      <h4>{cocktailInfo[0].method}</h4>
      <p>{cocktailInfo[0].cocktailType}</p>
      <p>{}</p>
    </Card>
  );
};
export default CocktailInfo;
