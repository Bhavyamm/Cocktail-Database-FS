import React, { useContext, useEffect, useState } from "react";
import { getAllDrinks } from "../actions/cocktailActions";
import Result from "../components/Result";
import "../css/DrinksScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../context/Context";
import { listMyOrders } from "../actions/orderActions";

const DrinksScreen = () => {
  const dispatch = useDispatch();
  const { cocktails, loading, error } = useSelector((state) => state.cocktail);

  const { search, changing, prev, all, display } = useContext(Context);
  const [searchTerm, setSearchTerm] = search;
  const [isChanging, setIsChanging] = changing;
  const [allDrinks, setAllDrinks] = all;
  const [displayTerm, setDisplayTerm] = display;

  const [prevTerm, setPrevTerm] = prev;

  useEffect(() => {
    dispatch(getAllDrinks());
    setSearchTerm("");
    setPrevTerm("");
    setAllDrinks("All Drinks");

    dispatch(listMyOrders());
  }, [dispatch]);

  // useEffect(() => {
  //   if(searchTerm === "") {

  //   }
  // }, [searchTerm])

  console.log(allDrinks, "all drinsk");

  return (
    <div className="results row">
      <div className="results__text col-12 text-center">
        <h1 className="results__title">
          {/* {searchTerm === "" && !isChanging
            ? allDrinks
            : cocktails.length === 0
            ? "No Results Found"
            : isChanging || prevTerm !== ""
            ? prevTerm
            : searchTerm} */}

          {searchTerm === "" && !isChanging
            ? allDrinks
            : isChanging && prevTerm !== ""
            ? prevTerm
            : cocktails.length !== 0
            ? displayTerm
            : "No Results Found"}
        </h1>
        <hr className="results__underline text-center" />
      </div>
      <br />
      <div className="results__main col-12">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          cocktails?.map((cocktail) => (
            <Result key={cocktail._id} result={cocktail} />
          ))
        )}
      </div>
    </div>
  );
};

export default DrinksScreen;
