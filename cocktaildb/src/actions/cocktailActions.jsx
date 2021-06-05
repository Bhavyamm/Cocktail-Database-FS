import axios from "axios";
import {
  GET_ALL_DRINKS,
  DRINK_ERROR,
  ADD_DRINK,
  GET_DRINK_BY_CATEGORY,
  GET_ALL_DRINKS_REQUEST,
  GET_DRINK_BY_CATEGORY_REQUEST,
  GET_DRINK_BY_ID,
} from "../constants/cocktailConstants";
import { setAlert } from "./alertActions";

import "react-notifications/lib/notifications.css";
import {
  
  NotificationManager,
} from "react-notifications";

export const getAllDrinks = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_DRINKS_REQUEST,
    });
    const { data } = await axios.get("http://127.0.0.1:9000/api/cocktails");

    dispatch({
      type: GET_ALL_DRINKS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DRINK_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createDrink = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:9000/api/cocktails",
      formData,
      config
    );

    dispatch({
      type: ADD_DRINK,
      payload: data,
    });

    // alert("Drink Added");

    NotificationManager.success("", "Drink Added");
  } catch (error) {
    dispatch({
      type: DRINK_ERROR,
      payload: {
        msg: error?.response.statusText,
        status: error?.response.status,
      },
    });

    // alert("Error in adding drink");
    NotificationManager.error("", "Error in adding drink");
  }
};

export const getDrinkByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DRINK_BY_CATEGORY_REQUEST,
    });
    const { data } = await axios.get(
      `http://127.0.0.1:9000/api/cocktails/${category}`
    );

    console.log(data);

    dispatch({
      type: GET_DRINK_BY_CATEGORY,
      payload: {
        drinks: data,
        category: category,
      },
    });
  } catch (error) {
    dispatch({
      type: DRINK_ERROR,
      payload: {
        msg: error?.response.statusText,
        status: error?.response.status,
      },
    });

    // alert("Error in getting drinks by category");
    NotificationManager.error("", "Error in getting drinks by category");
  }
};

export const getDrinkById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DRINK_BY_CATEGORY_REQUEST,
    });
    const { data } = await axios.get(
      `http://127.0.0.1:9000/api/cocktails/cocktail/${id}`
    );

    console.log(data, "data");

    dispatch({
      type: GET_DRINK_BY_ID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DRINK_ERROR,
      payload: {
        msg: error?.response.statusText,
        status: error?.response.status,
      },
    });

    // alert("Error in getting drinks by id");
    NotificationManager.error("", "Error in getting drinks by id");
  }
};
