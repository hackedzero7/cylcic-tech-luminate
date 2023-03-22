import React, { Fragment, useState } from "react";
import fromsLogo from "../../assets/froms_logo.png";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";
import { register } from "../../actions/auth";
import { PropTypes } from "prop-types";
import { useNavigate, Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import Cookies from "js-cookie";

const CreateCustomer = ({ setAlert, isAuthenticated, loading }) => {
  console.log(location.pathname);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { firstName, lastName, email } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(firstName, lastName, email);

  const onSubmit = async e => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    e.preventDefault();
    if (firstName === '' || lastName === " " || email === '') {
      setAlert("Make Sure all Fields are filled", "wrong_mesg");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      })
    } else {

      const customer = {
        firstName,
        lastName,
        email
      }
     


      const body = JSON.stringify(customer);
      const res = await axios.post("http://localhost:5000/create-customer", body, config);
      console.log(res.data)
      const customerId = res.data.customer.id
      console.log(customerId)
      Cookies.set("customer", customerId);
      Cookies.set("email", `${customer.email}`);
      Cookies.set("first-name", `${customer.firstName}`);
      Cookies.set("last-name", `${customer.lastName}`);
      navigate("/subscription");
    }
  };

  if (!!isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Fragment>
      {!loading ? (
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
      ) : (
        <Fragment>
          <Spinner />
        </Fragment>
      )}
    </Fragment>
  );
};

CreateCustomer.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { setAlert, register })(CreateCustomer);
