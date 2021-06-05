import React, { useContext, useEffect, useState } from "react";
import LockScreen from "react-lock-screen";
import "../css/Locked.css";
import styled from "styled-components";
import { Context } from "../context/Context";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";

const Locked = ({ match }) => {
  const { isLocked } = useContext(Context);

  const { cocktail } = useSelector((state) => state.cocktail);

  // console.log(orders, "orders");

  const [lock, setLock] = isLocked;

  const dispatch = useDispatch();

  const history = useHistory();

  const Button = styled.button`
    display: inline-block;
    color: black;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
    display: block;
    background-color: white;
    justify-content: center;
    transition: all 0.3s;
  `;

  const unlockMe = () => {
    dispatch(
      createOrder({
        paymentMethod: "Stripe",
        totalPrice: cocktail.price,
        orderItem: {
          name: cocktail.name,
          image: cocktail.image,
          price: cocktail.price,
          product: cocktail._id,
        },
      })
    );

    history.push(`/pay/${cocktail._id}`);
  };

  const getLockScreenUi = () => {
    return (
      <div
        className="react-lock-screen__ui"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>
          <img
            width="32"
            src="https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/102-256.png"
            alt="lock"
          />
          <p>Please purchase the recipe first</p>
        </div>
        <Button onClick={unlockMe} className="unlock-btn">
          Unlock
        </Button>
      </div>
    );
  };

  return (
    <>
      {lock && (
        <LockScreen timeout={lock} ui={getLockScreenUi}>
          {/* <p>Lorem Ipsum is not simply</p> */}
        </LockScreen>
      )}
    </>
  );
};

export default Locked;
