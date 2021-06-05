import React, { useEffect, useState } from "react";
import "../css/LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/authActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { setAlert } from "../actions/alertActions";

const LoginScreen = () => {
  const alert = useAlert();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && container) {
      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
        console.log(container.classList);
      });
    }
    if (signInButton && container) {
      signInButton?.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert.error("Please fill all the entries");
    }

    dispatch(login({ email, password }));

    // console.log(isAuthenticated, "is authenticated");

    // if (isAuthenticated === false) {
    //   alert.error("Please enter correct credentials");
    // } else {
    //   alert.success("Logged In Successfully!");
    //   setEmail("");
    //   setPassword("");
    // }

    setEmail("");
    setPassword("");

    console.log(localStorage.getItem("token"));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmRegisterPassword === ""
    ) {
      alert.error("Please fill all the entries");
    }

    if (password === confirmRegisterPassword) {
      dispatch(register({ name, email, password }));

      // if (isAuthenticated) {
      //   alert.success("Registered Successfully!");

      //   setName("");
      //   setEmail("");
      //   setPassword("");
      //   setConfirmRegisterPassword("");
      // }

      setName("")
      setEmail("")
      setPassword("")
      setConfirmRegisterPassword("")
    } else {
      alert.error("Passwords do not match");
    }
  };

  return (
    <div className="login-parent">
      <div className="login-container" id="container">
        <div className="login-form-container sign-up-container">
          <form className="login-form" onSubmit={handleRegisterSubmit}>
            <h1 className="login-h1 mb-4">Create Account</h1>
            <input
              className="login-input"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Confirm Password"
              name="confirmRegisterPassword"
              value={confirmRegisterPassword}
              onChange={(e) => setConfirmRegisterPassword(e.target.value)}
            />
            <button className="login-button mt-3" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="login-form-container sign-in-container">
          {!isAuthenticated ? (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h1 className="login-h1 mb-4">Sign in</h1>
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="login-input mb-4"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" type="submit">
                Sign In
              </button>
            </form>
          ) : (
            <div>
              <h1
                style={{
                  marginLeft: "16%",
                  marginTop: "35%",
                }}
              >
                You're successfully logged in!
              </h1>
              <Link to="/">
                <button
                  className="login-button mt-3"
                  style={{
                    marginLeft: "16%",
                  }}
                >
                  Go to Home
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="login-h1">Welcome Back!</h1>
              <p className="login-p">
                To keep connected with us please login with your personal info
              </p>
              <button className="login-button ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="login-h1">Hello, Friend!</h1>
              <p className="login-p">
                Enter your personal details and start journey with us
              </p>
              <button className="login-button ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
