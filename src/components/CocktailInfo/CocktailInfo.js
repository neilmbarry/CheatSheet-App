import React from "react";
import Card from "../UI/Card";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const CocktailInfo = (props) => {
  const cocktails = useSelector((state) => state.cocktails);
  const history = useHistory();
  const params = useParams();
  console.log(history.location.pathname);
  console.log(history);
  console.log(params.id);
  const cocktailInfo = cocktails.find((item) => {
    if (item.id === +params.id) return item;
  });
  console.log(cocktailInfo);
  return (
    <Card>
      <h2>{cocktailInfo.name}</h2>
      <h4>{cocktailInfo.glass}</h4>
      <h4>{cocktailInfo.ingredients}</h4>
      <p>{cocktailInfo.type}</p>
      <p>{}</p>
    </Card>
  );
};
export default CocktailInfo;
