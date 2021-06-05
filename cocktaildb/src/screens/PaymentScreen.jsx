import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IyK20SBqsh0Zyo7fJzODFNekKvZdhAfWpkTewyk9wBXbR1JUnouWIdfaSWqCZuiVMe9UWzWcHpKNljzVJ6t51ei00W4GT7l2w"
);

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const dispatch = useDispatch();

  const { cocktail } = useSelector((state) => state.cocktail);

  const { order } = useSelector((state) => state.orderCreate);

  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem("orderId", order._id);
    console.log(order, "order");

    const stripe = await stripePromise;

    const res = await axios.post(
      `http://127.0.0.1:9000/api/orders/create-checkout-session/${cocktail._id}`
    );

    console.log(res, "res");

    const result = await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });

    console.log(result, "result");

    if (result.error) {
      console.log(result.error.message, "error message");
    }
  };

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
    margin: 1em;
  `;

  return (
    <div className="container">
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <h3 className="ml-3 mt-4">Select Method</h3>
        <div className="form-check ml-5">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="stripe"
            value="Stripe"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="stripe">
            Stripe
          </label>
        </div>

        <Button type="submit" className="unlock-btn">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default PaymentScreen;
