import React from "react";
import header_image from "../assets/header_image.svg";
import "../css/Navbar.css";

const Hero = () => {
  return (
    <>
      <div className="nav__header" style={{ background: "#14505c" }}>
        <div className="nav__container">
          <div>
            <h3 className="nav__text">Make your favorite drink right away!</h3>
          </div>
          <img className="nav__headerImage" src={header_image} alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
