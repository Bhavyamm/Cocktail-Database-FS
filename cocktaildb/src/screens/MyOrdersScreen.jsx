import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { listMyOrders, listOrders } from "../actions/orderActions";
import "../css/MyOrdersScreen.css";

const MyOrdersScreen = () => {
  const { orders: myOrders } = useSelector((state) => state.orderListMy);

  const { orders: allOrders } = useSelector((state) => state.orderList);

  const dispatch = useDispatch();

  const location = useLocation();

  console.log(location.pathname, "location");

  useEffect(() => {
    if (location.pathname === "/my-orders") {
      dispatch(listMyOrders());
    } else if (location.pathname === "/all-orders") {
      dispatch(listOrders());
    }
  }, []);

  console.log(myOrders, "my orders");
  console.log(allOrders, "all orders");

  return (
    <div className="my-orders">
      <table class="rwd-table">
        <tr>
          <th>Drink Name</th>
          <th>Price</th>
          <th>Payment Status</th>
          <th>Paid On</th>
          {location.pathname === "/all-orders" && <th>Customer name</th>}
          {location.pathname === "/all-orders" && <th>Customer email</th>}
        </tr>
        {location.pathname === "/my-orders"
          ? myOrders?.map((order) => (
              <tr>
                <td data-th={order.orderItem.name}>{order.orderItem.name}</td>
                <td data-th={order.orderItem.price}>{order.orderItem.price}</td>
                <td data-th={order.isPaid}>
                  {order.isPaid ? "Paid" : "Not Paid"}
                </td>
                <td data-th={order.paidAt}>{order.paidAt.split("T")[0]}</td>
              </tr>
            ))
          : allOrders?.map((order) => (
              <tr>
                <td data-th={order.orderItem.name}>{order.orderItem.name}</td>
                <td data-th={order.orderItem.price}>{order.orderItem.price}</td>
                <td data-th={order.isPaid}>
                  {order.isPaid ? "Paid" : "Not Paid"}
                </td>
                <td data-th={order.paidAt}>{order.paidAt.split("T")[0]}</td>
                <td data-th={order.user.name}>{order.user.name}</td>
                <td data-th={order.user.email}>{order.user.email}</td>
              </tr>
            ))}
      </table>
    </div>
  );
};

export default MyOrdersScreen;
