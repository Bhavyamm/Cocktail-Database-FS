import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrinkById } from "../actions/cocktailActions";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../css/DrinkScreen.css";
import Locked from "../components/Locked";
import { createOrder, listMyOrders } from "../actions/orderActions";

const DrinkScreen = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const { cocktail } = useSelector((state) => state.cocktail);

  const orderDetails = useSelector((state) => state.orderListMy);

  const { orders } = useSelector((state) => state.orderListMy);
  const params = useParams();

  console.log(orders, "orders");

  let currentProduct;

  currentProduct = orders?.map(
    // (order) => order.orderItem.product === params.id && order
    (order) => order.orderItem.product === params.id && order
  );

  const test = orders?.find((order) => order.orderItem.product === params.id);

  console.log(test, "test");

  console.log(currentProduct, "current product");

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDrinkById(location.pathname.split("/")[2]));
  }, [dispatch]);

  const Button = styled.button`
    display: inline-block;
    color: #39a6a3;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #39a6a3;
    border-radius: 3px;
    display: block;
    background-color: white;
    margin-left: 3em;
  `;

  return (
    <div>
      {!test?.isPaid ? (
        <Locked />
      ) : (
        <div className="container mt-4">
          <div className="row">
            {/* <Link to="/cocktail"> */}
            <Button
              className="ml-5 mb-3 search-btn go-back"
              onClick={() => history.push("/cocktail")}
            >
              Go back
            </Button>
            {/* </Link> */}
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <img
                className="ml-4"
                src={cocktail?.image}
                style={{ width: "500px", height: "400px" }}
              />
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="ml-5">
                <h2>Drink Name - </h2>
                <p className="lead ml-4">-&#62; {cocktail?.name}</p>
              </div>
              <div className="ml-5">
                <h2>Category - </h2>
                <p className="lead ml-4">-&#62; {cocktail?.category}</p>
              </div>
              <div className="ml-5">
                <h2>Ingredients -</h2>
                {cocktail?.ingredients.map((ing, idx) => (
                  <p className="ml-4 lead">
                    {idx + 1}. {ing}
                  </p>
                ))}
              </div>
              <div className="ml-5">
                <h2>Instructions - </h2>
                <p className="ml-4 lead"> -&#62; {cocktail?.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkScreen;
