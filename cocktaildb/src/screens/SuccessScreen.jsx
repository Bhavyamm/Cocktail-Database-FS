import React, { useEffect } from "react";
import { payOrder } from "../actions/orderActions";
import "../css/SuccessScreen.css";
import { useDispatch, useSelector } from "react-redux";

const SuccessScreen = () => {
  function PathLoader(el) {
    this.el = el;
    this.strokeLength = el.getTotalLength();

    this.el.style.strokeDasharray = this.el.style.strokeDashoffset =
      this.strokeLength;
  }

  PathLoader.prototype._draw = function (val) {
    this.el.style.strokeDashoffset = this.strokeLength * (1 - val);
  };

  PathLoader.prototype.setProgress = function (val, cb) {
    this._draw(val);
    if (cb && typeof cb === "function") cb();
  };

  PathLoader.prototype.setProgressFn = function (fn) {
    if (typeof fn === "function") fn(this);
  };

  var body = document.body,
    svg = document.querySelector("svg path");

  if (svg !== null) {
    svg = new PathLoader(svg);

    setTimeout(function () {
      document.body.classList.add("active");
      svg.setProgress(1);
    }, 200);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(localStorage.getItem("orderId"), "order id");
    dispatch(payOrder(localStorage.getItem("orderId")));
  }, []);

  return (
    <div class="success-message">
      <svg viewBox="0 0 76 76" class="success-message__icon icon-checkmark">
        <circle cx="38" cy="38" r="36" />
        <path
          fill="none"
          stroke="#FFFFFF"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          d="M17.7,40.9l10.9,10.9l28.7-28.7"
        />
      </svg>
      <h1 class="success-message__title">Payment Received</h1>
      <div class="success-message__content">
        <p>You can now access the recipe</p>
      </div>
    </div>
  );
};

export default SuccessScreen;
