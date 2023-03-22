import React, { useState } from "react";
import { forgotPassword } from "../../actions/auth";
import { connect } from "react-redux";

const ForgotPassword = ({forgotPassword}) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // console.log(email);
    forgotPassword(formData);
  };
  return (
    <div className="forms_main_div">
      <div className="row  flex h-100">
        <div className="col-12 col-md-12 col-lg-6">
          <div className="form_card">
            <a href="index.html">
              <img src="images/logo.png" className="img-fluid formlogo d-lg-none" />
            </a>
            <h2 className="form_heading">Password Revovery</h2>
            <form onSubmit={e => onSubmit(e)}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                onChange={e => onChange(e)}
                placeholder="email@example.com"
                value={email}
                required
              />
              <div className="text-center">
                <input type="Submit" name="" value="Recover Password" />
              </div>
            </form>
          </div>
          {/* <!-- form card end --> */}
        </div>

        <div className="col-12 col-lg-6 reg_right_side ">
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

export default connect(null, { forgotPassword })(ForgotPassword);
