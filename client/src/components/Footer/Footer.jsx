import { React, Fragment } from "react";
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <Fragment>
      <section className="above_footer">
        <img
          src={logo}
          className="img-fluid text-center d-block m-auto"
        />

        <div className="row gy-5 mt-5">
          <div className="col-12 col-md-4 col-lg-3">
            <p className="gen_p">New York City USA</p>
            <a href="" className="direction_links">
              Get directions
            </a>
          </div>
          <div className="col-12 col-md-5 col-lg-3">
            <p className="gen_p text-white">Sign up for uour newsletter</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your email address"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3 col-lg-3 offset-lg-3 footer_links ps-md-5">
            <a href="#courses">Courses</a>
            <br />
            <a href="#pricing_section">Pricing Pack</a>
          </div>
        </div>

        {/* <!-- row end --> */}
      </section>
      <footer className="py_5 text-center">
        <p className="copyright_p">TechLuminate Academy 2023. All rights reserved</p>
        <a href="" className="prvay_link">
          Privacy Policy
        </a>
      </footer>
    </Fragment>
  );
};

export default Footer;
