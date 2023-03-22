import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Alert from "../Alert/Alert";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import store from "../../store";
import { loadUser } from "../../actions/auth";

const Dashboard = ({ isAuthenticated, user, loading, loadUser }) => {
  const [load, setLoader] = useState(true);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const setLoaderHandler = () => {
    if (isAuthenticated) {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoaderHandler();
  }, [setLoader]);

  console.log("user", isAuthenticated, user);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="margintop"></div>
          <div style={{ color: "#fff" }}>
            <h1 style={{ color: "#fff", fontSize: 30 }}>
              Welcome to Tech Luminate Academy{" "}
              {user && `${user.data.firstName} ${user.data.lastName}`}
            </h1>
            <p style={{ fontSize: 40 }}>{user && user.data.email}</p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
