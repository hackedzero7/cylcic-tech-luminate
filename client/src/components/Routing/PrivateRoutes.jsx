import React, { Fragment } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dashboard from "../Dashboard/Dashboard";
import SignIn from "../Login/Login";
import Spinner from "../Spinner/Spinner";

const PrivateRoutes = ({ isAuthenticated, loading }) => {
  return loading && !isAuthenticated ? (
    <Spinner />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoutes);
