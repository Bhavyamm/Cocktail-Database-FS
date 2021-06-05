import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import cocktail from "./cocktailReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
} from "./orderReducer";

export default combineReducers({
  auth,
  alert,
  cocktail,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});
