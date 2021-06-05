import React from "react";
import Facts from "../components/Facts";
import "../css/Body.css";
import { ReactComponent as Lemonade } from "../assets/lemonade.svg";
import { ReactComponent as Cocktail } from "../assets/cocktail.svg";
import { ReactComponent as Coffee } from "../assets/coffee.svg";

const LandingScreen = () => {
  return (
    <>
      <div className="body">
        <div className="body__container">
          <Lemonade className="body__image" />
          <p className="body__text">
            Ever wondered what different types of cocktails tastes like? Then
            why don't end the curiosity. We provide the recipe of a large
            variety of cocktails.
          </p>
        </div>

        <div className="body__container">
          <p className="body__text">
            But what if you don't take alcohol? Right? Well don't worry, we have
            the recipe of both alcoholic as well as non-alcoholic drinks. Just
            search right away.
          </p>
          <Cocktail className="body__imageInverted" />
        </div>

        <div className="body__container">
          <Coffee className="body__image" />
          <p className="body__text">
            Bored of drinking that same coffee over and over? Well you'll be
            surpised to know in how many different ways you can drink it.
          </p>
        </div>
      </div>

      <Facts />
    </>
  );
};

export default LandingScreen;
