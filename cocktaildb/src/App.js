import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import DrinksScreen from "./screens/DrinksScreen";
import PrivateRoute from "./components/PrivateRoute";

import { Provider as GlobalProvider } from "react-redux";
import store from "./store";
import setAuthToken from "./util/setAuthToken";
import { loadUser } from "./actions/authActions";

import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CreateDrinkScreen from "./screens/CreateDrinkScreen";

import { Provider as ContextProvider } from "./context/Context";
import DrinkScreen from "./screens/DrinkScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SuccessScreen from "./screens/SuccessScreen";
import ErrorScreen from "./screens/ErrorScreen";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import MyOrdersScreen from "./screens/MyOrdersScreen";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    localStorage.removeItem("orderId");
  }, []);

  const options = {
    timeout: 3000,
    position: positions.TOP_CENTER,
  };

  return (
    <ContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <GlobalProvider store={store}>
          <Router>
            <NotificationContainer />
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Hero />
                <LandingScreen />
              </Route>
              <Route exact path="/login">
                <LoginScreen />
              </Route>
              <Route exact path="/cocktail">
                <DrinksScreen />
              </Route>
              <PrivateRoute
                exact
                path="/create-drink"
                component={CreateDrinkScreen}
              />
              <Route exact path="/cocktail/:id">
                <DrinkScreen />
              </Route>
              <PrivateRoute exact path="/pay/:id" component={PaymentScreen} />
              <PrivateRoute
                exact
                path="/checkout/success"
                component={SuccessScreen}
              />
              <PrivateRoute
                exact
                path="/checkout/error"
                component={ErrorScreen}
              />
              <PrivateRoute
                exact
                path="/my-orders"
                component={MyOrdersScreen}
              />
              <PrivateRoute
                exact
                path="/all-orders"
                component={MyOrdersScreen}
              />
            </Switch>
          </Router>
        </GlobalProvider>
      </AlertProvider>
    </ContextProvider>
  );
};

export default App;
