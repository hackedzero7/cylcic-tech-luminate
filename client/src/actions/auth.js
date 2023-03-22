import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT_FAIL,
  LOGOUT,
  LOADING,
  LOADING_DONE,
} from "../actions/types";
import axios from "axios";
import setAlert from "./alert";
import { redirect } from "react-router";
import setAuthCookie from "../utils/setAuthCookie";
import { Cookies } from "window-or-global";

// Register User

export const register =
  ({ firstName, lastName, email, password, history }) =>
  async dispatch => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("You have successfully registered", "success_mesg"));
      //   dispatch(loadUser());
    } catch (err) {
      const errors = err.response;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "wrong_mesg")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login user
export const login =
  ({ email, password }) =>
  async dispatch => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(setAlert("You have successfully logged in", "success_mesg"));
    } catch (err) {
      console.log(err);
      // const errors = err.response.data.errors;
      dispatch(
        setAlert("Please enter the correct username or password", "wrong_mesg")
      );
      // if (errors) {
      //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      // }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const forgotPassword = formData => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  console.log(body);
  try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/forgotpassword", body, config);
    dispatch({
      type: FORGOT_PASSWORD,
      payload: res.data,
    });
    dispatch(
      setAlert(
        "check your email for instructions to reset your password",
        "success_mesg"
      )
    );
  } catch (err) {
    dispatch(setAlert(`${err.message}`, "wrong_mesg"));
    dispatch({
      type: FORGOT_PASSWORD_ERROR,
    });
  }
};

export const resetPassword = (resetToken, newPassword) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(newPassword);
  console.log(body);
  try {
    const res = await axios.put(
      `http://localhost:5000/api/v1/auth/resetpassword/${resetToken}`,
      body,
      config
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert("You have successfully reset your password", "success_mesg")
    );
  } catch (err) {
    dispatch(setAlert(`${err.message}`, "wrong_mesg"));
    dispatch({
      type: RESET_PASSWORD_ERROR,
    });
  }
};

// Logout clear profile
export const logout = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/auth/logout");
    dispatch({ type: LOGOUT, payload: res.data });
    dispatch(setAlert("You have successfully logged out", "success_mesg"));
  } catch (err) {
    dispatch({ type: LOG_OUT_FAIL, error: err.message });
  }
};

// lOAD USER
export const loadUser = () => async (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
  const { token } = auth;
  if (token) {
    setAuthCookie(token);
  }
  console.log(token);
  let config = {
    withCredentials: true,
  };

  try {
    const res = await axios.get("http://localhost:5000/api/v1/auth/me", config);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    console.log(err);
  }
};
