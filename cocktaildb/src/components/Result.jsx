import React from "react";
import "../css/Result.css";
import { useHistory } from "react-router-dom";

const Result = ({ result }) => {
  // console.log(result, "result");

  const history = useHistory();

  const displayDrink = () => {
    console.log(result._id, "key");
    history.push(`/cocktail/${result._id}`);
  };

  return (
    <div className="result" onClick={displayDrink}>
      <img className="result__image" src={result.image} />
      <h3 className="result__title">
        {result.name} - {result.price} rupees
      </h3>
    </div>
  );
};

export default Result;
