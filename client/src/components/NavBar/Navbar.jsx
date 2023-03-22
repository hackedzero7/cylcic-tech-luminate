import { React, Fragment, useState } from "react";
import logo from "../../assets/logo.png";
import "../../css/bootstrap.min.css";
import "../../css/responsive.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ isAuthenticated, logout }) => {
  let navigate = useNavigate();
  let location = useLocation();

  // Toggle Mobile Menu
  const [isFaBars, toggleBars] = useState("");
  const [isFaTimes, toggleTimes] = useState("none");
  const [isMenu, toggleMenu] = useState("");

  const mobileToggleHandler = () => {
    if (isFaBars === "" && isFaTimes === "none") {
      toggleBars("none");
      toggleTimes("inline");
      toggleMenu("show") ;
    } else {
      toggleBars("");
      toggleTimes("none");
      toggleMenu("");
    }
  };

  //assigning location variable

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const logOutHandler = () => {
    logout();
    navigate("/sign-in", { replace: true });
    // setLoading(isLoading)
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container px_2  ">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="LogoImage"
              className="img-fluid main_logo"
              id="main_logo"
            />
          </Link>

          <button
            onClick={mobileToggleHandler}
            className="navbar-toggler"
            type="button"
          >
            {" "}
            <i className={`fa fa-bars`} style={{ display: isFaBars }}></i>{" "}
            <i
              className={`fa fa-times close_icon`}
              style={{ display: isFaTimes }}
            ></i>{" "}
          </button>

          <div
            className={` navbar-collapse menu-links text-center collapse   ${isMenu}`}
            id="fornav"
          >
            {splitLocation[1] !== "sign-up" &&
              splitLocation[1] !== "sign-in" &&
              splitLocation[1] !== "dashboard" && (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item" onClick={mobileToggleHandler}>
                    <a href="#Platform" className="nav-link">
                      Platform
                    </a>
                  </li>
                  <li className="nav-item" onClick={mobileToggleHandler}>
                    <a href="#Courses" className="nav-link">
                      Courses
                    </a>
                  </li>
                  <li className="nav-item" onClick={mobileToggleHandler}>
                    <a href="#Pricing_Pack" className="nav-link ">
                      Pricing Pack
                    </a>
                  </li>
                </ul>
              )}

            <ul className="navbar-nav ms-auto ">
              {!isAuthenticated && (
                <Fragment>
                  <li className="nav-item" onClick={mobileToggleHandler}>
                    <Link to="sign-in" className="nav-link loginlink">
                      Sign In
                    </Link>
                  </li>
                  <li
                    onClick={mobileToggleHandler}
                    className={
                      (splitLocation[1] === "sign-up" ? "active" : "",
                      "nav-item")
                    }
                  >
                    <Link 
                    onClick={mobileToggleHandler}
                    to="create-customer" className="nav-link signup_btn">
                    Sign Up
                    </Link>
                  </li>
                </Fragment>
              )}

              {!!isAuthenticated && (
                <li
                  className={
                    // (splitLocation[1] === "sign-up" ? "active" : "",
                    "nav-item"
                  }
                >
                  <Link
                    onClick={logOutHandler}
                    to="/dashboard"
                    className="nav-link signup_btn"
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);
