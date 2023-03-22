import React, { Fragment, useState } from "react";
import fromsLogo from "../../assets/froms_logo.png";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";
import {register} from "../../actions/auth";
import {PropTypes} from 'prop-types'
import { useNavigate, Navigate } from "react-router-dom";
import Spinner from '../Spinner/Spinner'


const SignUp = ({setAlert, register, isAuthenticated, loading}) => {
  
console.log(location.pathname)
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });
  const { firstName, lastName, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(firstName, lastName, email, password, password2);

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "wrong_mesg");
    } else {
      // console.log(formData);
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      console.log(newUser);
   register(newUser);
   navigate("/dashboard");

    }
   

  };


  if(!!isAuthenticated){
    return <Navigate to="/dashboard"/>
  }
  return (

    <Fragment>
      {
        !loading ?

        <Fragment>
          <div className="forms_main_div">
      <div className="row  flex h-100">
        <div className="col-12 col-md-12 col-lg-6">
          <div className="form_card">
            <a href="index.html">
              <img src={logo} className="img-fluid formlogo d-lg-none" />
            </a>

            <h2 className="form_heading">Sign Up</h2>
            <form onSubmit={e => onSubmit(e)}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                required
                value={firstName}
                onChange={e => onChange(e)}
              />
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                required
                value={lastName}
                onChange={e => onChange(e)}
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={e => onChange(e)}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                required
                value={password}
                onChange={e => onChange(e)}
              />
                <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                placeholder="password"
                required
                value={password2}
                onChange={e => onChange(e)}
              />
              <input type="Submit" name="" value="Sign Up" readOnly />
            </form>
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
    </div>
    </Fragment>
    :

  <Fragment>
    <Spinner/>
  </Fragment>
      }
    </Fragment>
    
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})
export default connect(mapStateToProps, {setAlert, register})(SignUp);
