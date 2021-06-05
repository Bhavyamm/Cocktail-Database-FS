import axios from "axios";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../constants/authConstants";
import { setAlert } from "./alertActions";
import setAuthToken from "../util/setAuthToken";

import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("http://127.0.0.1:9000/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  // const alert = useAlert();

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(email, password);

  try {
    const res = await axios.post(
      "http://127.0.0.1:9000/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // alert("Logged In Successfully!");
    NotificationManager.success("", "Logged In Successfully");

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response?.data.errors;

    // console.log(errors.forEach(err => ));
    errors?.forEach((err) => console.log(err));

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });

    // alert("Invalid credentials");
    NotificationManager.error("", "Invalid credentials");
  }
};

export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(name, email, password);

  try {
    const res = await axios.post(
      "http://127.0.0.1:9000/api/users",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // alert("Registered Successfully!");
    // alert("Logged In Successfully!");

    NotificationManager.success("", "Registered Successfully");
    NotificationManager.success("", "Logged In Successfully");

    dispatch(loadUser());
  } catch (error) {
    console.error(error);

    dispatch({
      type: REGISTER_FAIL,
    });

    // alert("Invalid credentials");
    NotificationManager.error("", "Invalid credentials");
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  NotificationManager.success("", "Logged Out");
};
