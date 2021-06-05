import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
import { Context } from "../context/Context";
import { getAllDrinks, getDrinkByCategory } from "../actions/cocktailActions";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import "../css/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const location = useLocation();

  const history = useHistory();
  // console.log(location, "location");

  const { search, changing, prev, all, display } = useContext(Context);
  const [searchTerm, setSearchTerm] = search;
  const [isChanging, setIsChanging] = changing;
  const [prevTerm, setPrevTerm] = prev;
  const [allDrinks, setAllDrinks] = all;
  const [displayTerm, setDisplayTerm] = display;

  const dispatch = useDispatch();

  const logMeOut = () => {
    dispatch(logout());
    history.push("/");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const showAllDrinks = () => {
    history.push("/cocktail");
    setSearchTerm("");
    setAllDrinks("All Drinks");
    dispatch(getAllDrinks());
    window.location.reload();
  };

  const handleChange = (e) => {
    setIsChanging(true);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChanging(false);
    setDisplayTerm(searchTerm);
    setPrevTerm(searchTerm);
    if (searchTerm === "") {
      dispatch(getAllDrinks()); // Not Working! Check again
    }
    dispatch(getDrinkByCategory(capitalizeFirstLetter(searchTerm)));
  };

  const Button = styled.button`
    display: inline-block;
    color: #39a6a3;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #39a6a3;
    border-radius: 3px;
    display: block;
  `;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Cocktail Database
          <img
            className="ml-1"
            src="https://img.icons8.com/dusk/64/000000/cocktail.png"
            style={{
              width: "15%",
              objectFit: "contain",
            }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* {isAuthenticated && ( */}
        <Button className="btn btn-lg search-btn" onClick={showAllDrinks}>
          Show All Drinks
        </Button>
        {/* )} */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="form-inline my-2 my-lg-0 ml-auto"
            onSubmit={handleSubmit}
          >
            {location.pathname === "/cocktail" && (
              <>
                <input
                  className="form-control mr-sm-2 search-input"
                  type="search"
                  placeholder="Search a Category"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <Button className="btn my-2 my-sm-0 search-btn" type="submit">
                  Search
                </Button>
              </>
            )}

            {isAuthenticated ? (
              <>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <IconButton>
                        <AccountCircleOutlinedIcon style={{ color: "white" }} />
                      </IconButton>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="navbarDropdown"
                      style={{
                        borderRadius: "0",
                        backgroundColor: "#343A40",
                      }}
                    >
                      <a
                        className="dropOption dropdown-item"
                        href={user?.isAdmin ? `/all-orders` : `/my-orders`}
                        style={{ color: "white" }}
                      >
                        {user?.isAdmin ? "All Orders" : "My Orders"}
                      </a>
                      <a
                        className="dropOption dropdown-item"
                        href="/login"
                        style={{ color: "white" }}
                      >
                        Go to Login Page
                      </a>
                      {user?.isAdmin && (
                        <a
                          className="dropOption dropdown-item"
                          href="/create-drink"
                          style={{ color: "white" }}
                        >
                          Add a Drink
                        </a>
                      )}
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropOption dropdown-item"
                        href="#"
                        onClick={logMeOut}
                        style={{ color: "white" }}
                      >
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <IconButton>
                <Link to="/login">
                  <PersonAddOutlinedIcon style={{ color: "white" }} />
                </Link>
              </IconButton>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
