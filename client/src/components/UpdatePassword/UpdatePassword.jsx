import React, { useState } from "react";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";
import {resetPassword} from '../../actions/auth'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

const UpdatePassword = ({ setAlert, resetPassword }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    password2: "",
  });

  const { password, password2, currentPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { resetToken } =  useParams();
  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      const newPassword = {
        password
      };
      resetPassword(resetToken, newPassword);
      navigate("/sign-in");
      console.log(resetToken, newPassword);
    }
  };

  console.log(resetToken);

  return (
    <div className="forms_main_div">
      <div className="row  flex h-100">
        <div className="col-12 col-md-12 col-lg-6">
          <div className="form_card">
            <a href="index.html">
              <img src="images/logo.png" className="img-fluid formlogo d-lg-none" />
            </a>

            <h2 className="form_heading">Enter New password</h2>
            <form onSubmit={e => onSubmit(e)}>
              <label>Current Password</label>
              <div className="passwrod_section">
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control input_pass"
                  value={currentPassword}
                  placeholder="password"
                  id="showpass"
                  required
                  onChange={e => onChange(e)}
                />
                <i className="fa fa-eye eyeicon" onclick="myFunction()"></i>
              </div>

              <label>New Password</label>
              <div className="passwrod_section">
                <input
                  type="password"
                  name="password"
                  className="form-control input_pass"
                  value={password}
                  placeholder="password"
                  id="showpass"
                  required
                  onChange={e => onChange(e)}
                />
                <i className="fa fa-eye eyeicon" onclick="myFunction()"></i>
              </div>

              <label>Retype New Password</label>
              <div className="passwrod_section">
                <input
                  type="password"
                  name="password2"
                  className="form-control input_pass"
                  value={password2}
                  placeholder="password"
                  id="showpass"
                  required
                  onChange={e => onChange(e)}
                />
                <i className="fa fa-eye eyeicon" onclick="myFunction()"></i>
              </div>

              <div className="text-center mt-5	">
                <input type="Submit" value="Update Password" />
              </div>
            </form>
          </div>
          {/* <!-- form card end --> */}
        </div>

        <div className="col-12 col-lg-6 reg_right_side  ">
          <a href="index.html">
            <img src="images/froms_logo.png" className="img-fluid formlogo" />
          </a>
        </div>
        {/* <!-- reg_right_side end --> */}
      </div>
      {/* <!-- row end --> */}
    </div>
  );
};

export default connect(null, { setAlert, resetPassword })(UpdatePassword);
