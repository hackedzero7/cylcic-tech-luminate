import React, { useState, useEffect, Fragment } from "react";
import logo from "../../assets/logo.png";
import fromsLogo from "../../assets/froms_logo.png";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";
import { login } from "../../actions/auth";
import { PropTypes } from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Login = ({ login, isAuthenticated, loading }) => {
  let location = useLocation();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isShown, setIsSHown] = useState(false);
  const [load, setIsLoading] = useState(true);
  const { email, password } = formData;

  console.log(email, password);

  const togglePassword = () => {
    setIsSHown(isShown => !isShown);
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const userCredentials = {
      email,
      password,
    };

    login(userCredentials);
    navigate("/dashboard");
  };
  console.group(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      

        <div className="forms_main_div">
          <div className="row  flex h-100">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="form_card">
                <a href="index.html">
                  <img src={logo} className="img-fluid formlogo d-lg-none" />
                </a>

                <h2 className="form_heading mb-3">Welcome Back</h2>
                <p className="login_desc">
                  Welcome back! Please enter your details.
                </p>
                <form onSubmit={e => onSubmit(e)}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required=""
                    value={email}
                    onChange={e => onChange(e)}
                  />
                  <label>Password</label>
                  <div className="passwrod_section">
                    <input
                      type={isShown ? "text" : "password"}
                      name="password"
                      className="form-control input_pass"
                      value={password}
                      placeholder="password"
                      id="showpass"
                      required
                      onChange={e => onChange(e)}
                    />
                    <i
                      className="fa fa-eye eyeicon"
                      onClick={togglePassword}
                    ></i>
                  </div>
                  <div className="forgot_link_sec">
                    <Link className="forgotpass_link" to="/forgot-password">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <input type="Submit" name="" value="Sign In" readOnly />
                  </div>
                </form>

                <p className="form_last_link">
                  Don’t have an account? <Link to="/sign-up">Sign Up</Link>
                </p>
              </div>
              {/* <!-- form card end --> */}
            </div>

            <div className="col-12 col-lg-6 reg_right_side ">
              <a href="index.html">
                <img src={fromsLogo} className="img-fluid formlogo" />
              </a>
            </div>
            {/* <!-- reg_right_side end --> */}
          </div>
          {/* <!-- row end --> */}
        </div>

    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, login })(Login);
