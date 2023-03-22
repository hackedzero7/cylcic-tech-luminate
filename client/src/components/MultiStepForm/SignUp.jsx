import React, { Fragment, useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { PropTypes } from "prop-types";
import setAlert from "../../actions/alert";
import axios from "axios";
import Cookies from "js-cookie";

const CreateAccount = ({ setAlert, register,  }) => {

  let navigate = useNavigate();
  let location = useLocation();

  const {state} = location;
  // let status = state.state.status
  let firstNameString = Cookies.get('first-name')
  let lastNameString = Cookies.get('last-name');
  let emailString = Cookies.get('email')

  const [formData, setFormData] = useState({
    firstName:  firstNameString ? firstNameString : "",
    lastName: lastNameString ? lastNameString :  "",
    email: emailString ? emailString : "",
    password: "",
    password2: "",
  });
  const [isFormValid, setFormValid] = useState(false);
  const { firstName, lastName, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
const   isSubscriptionConfirmed = true;
  console.log(firstName, lastName, email, password, password2, isSubscriptionConfirmed);

  const onSubmit = async e => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    e.preventDefault();

    if (password !== password2 ) {
      setAlert("Passwords do not match", "wrong_mesg");
    } else {
      // console.log(formData);
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        isSubscriptionConfirmed
      };
      const customer = {
        firstName,
        lastName,
        email
      }

      console.log(newUser);
      register(newUser);
      const body = JSON.stringify(customer);
      const res = await axios.post("http://localhost:5000/create-customer", body, config);
      console.log(res.data)
      navigate("/dashboard");
    }

  };

  return (
    <Fragment>
      <div className="form_card" style={{marginTop: 250}} >
        <a href="index.html">
          <img src={logo} className="img-fluid formlogo d-lg-none" />
        </a>

        <h2 className="form_heading">Create Password</h2>
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
    </Fragment>
  );
};
CreateAccount.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { setAlert, register })(CreateAccount);
