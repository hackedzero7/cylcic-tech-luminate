import { React, Fragment } from "react";
import {Navigate} from "react-router-dom";
import globe from "../../assets/globe.png";
import course_icon from "../../assets/courses_icon.png";
import lesson_icon from "../../assets/lessson_icon.png";
import video_icon from "../../assets/video_icon.png";
import plateforms from "../../assets/plateforms.png";
import seller_badge from "../../assets/seller_badge.png";
import java from "../../assets/java.png";
import php from "../../assets/php.png";
import html from "../../assets/html.png";
import check_mark from "../../assets/check_mark.png";
import apple_pay from "../../assets/apple_pay.png";
import Footer from "../Footer/Footer";
import {connect} from 'react-redux'
import "./custom.css"

 const LandingPage = ({isAuthenticated}) => {

if(!!isAuthenticated) {
  return <Navigate to="/dashboard"/>
}

  return (
    <Fragment>
      <div className="margintop"></div>
      <div className="container px_2">
        <section className="hero_section py_6">
          <div className="row gy-5 flex">
            <div className="col-12 col-md-7">
              <h1 className="hero_heading" id="h1-mobile">
              Ready to Launch Your Tech Career? Join Tech luminate Academy!
              </h1>
              <p className="hero_p sub-text" >
                Are you looking for a career change and have a love for
                technology? <br />
                Techluminate Academy can help you turn your passion into a
                fulfilling career.
              </p>
              <a href="#" className="hero_btn">
                learn more
              </a>
            </div>

            <div className="col-12 col-md-5">
              <img
                src={globe}
                className="img-fluid hero_img d-none d-md-block"
                alt="globe"
              />
            </div>
          </div>
        </section>
        <section className="plateform_section py_6" id="Platform">
          <h2 className="section_heading">Techluminate platform</h2>
          <hr className="section_spacer" />
          <div className="row mt-5 gy-5 flex">
            <div className="col-12 col-md-6">
              <img
                src={plateforms}
                className="img-fluid img_center"
                alt="plateform Image"
              />
            </div>
            {/* <!-- left end --> */}
            <div className="col-12 col-md-6">
              <h3 className="section_sub_heading" id="h1-mobile-two">
              Expert-led online courses at Techluminate Academy
              </h3>
              <p className="gen_p my_2 sub-text">
              Techluminate Academy offers expert-led online technical training courses in various technologies, including JavaScript, React, and PHP. More courses are constantly being added to the platform.
              </p>
              <div className="row ">
                <div className="col-6">
                  <div className="icon_flex">
                    <img src={course_icon} className="img-fluid course_icon" />
                    <p className="icon_text">1500+ Courses</p>
                  </div>
                  <div className="icon_flex">
                    <img src={lesson_icon} className="img-fluid course_icon" />
                    <p className="icon_text">10K+ Lessons</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="icon_flex">
                    <img src={video_icon} className="img-fluid course_icon" />
                    <p className="icon_text">200+ Free Videos</p>
                  </div>
                  <div className="icon_flex">
                    <img src={lesson_icon} className="img-fluid course_icon" />
                    <p className="icon_text">Qualified Teachers</p>
                  </div>
                </div>
              </div>
              {/* <!-- row end --> */}
            </div>
            {/* <!-- right end --> */}
          </div>
        </section>
        {/* <!------ plateform end ------> */}

        <section className="py_6 courses_section" id="Courses">
          <h2 className="section_heading">Available courses</h2>
          <hr className="section_spacer" />

          <div className="row mt-5 g-5 ">
            <div className="col-12 col-md-4">
              <div className="course_card">
                <img src={java} className="img-fluid" alt="java" />
                <div className="row course_details flex">
                  <div className="col-7">
                    <a href="#" className="course_link">
                      <h4 className="course_name">Java</h4>
                    </a>
                    <p className="course_desc">Lorem Ipsum dolor </p>
                  </div>
                  <div className="col-5">
                    <div className="icon_flex">
                      <img
                        src={seller_badge}
                        className="img-fluid "
                        alt="java"
                      />
                      <p className="best_seller">Best Seller</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- course_card end --> */}
            </div>
            {/* <!-- java end --> */}

            <div className="col-12 col-md-4">
              <div className="course_card">
                <img src={php} className="img-fluid" alt="java" />
                <div className="row course_details flex">
                  <div className="col-7">
                    <a href="#" className="course_link">
                      <h4 className="course_name">Php</h4>
                    </a>
                    <p className="course_desc">Lorem Ipsum dolor </p>
                  </div>
                  <div className="col-5">
                    <div className="icon_flex">
                      <img
                        src={seller_badge}
                        className="img-fluid "
                        alt="java"
                      />
                      <p className="best_seller">Best Seller</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- course_card end --> */}
            </div>
            {/* <!-- java end --> */}

            <div className="col-12 col-md-4">
              <div className="course_card">
                <img src={html} className="img-fluid" alt="java" />
                <div className="row course_details flex">
                  <div className="col-7">
                    <a href="#" className="course_link">
                      <h4 className="course_name">HTMl</h4>
                    </a>
                    <p className="course_desc">Lorem Ipsum dolor </p>
                  </div>
                  <div className="col-5">
                    <div className="icon_flex">
                      <img
                        src={seller_badge}
                        className="img-fluid "
                        alt="java"
                      />
                      <p className="best_seller">Best Seller</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- course_card end --> */}
            </div>
            {/* <!-- java end --> */}
          </div>
          {/* <!-- row end --> */}
        </section>
        {/* <!------ courses_section end ------> */}

        <section className="pricing_section py_6" id="Pricing_Pack">
          <h3 className="section_heading lh_47 text-center">
          Join the Techluminate Academy Platform{" "}
            {/* <span className="d-inline d-md-block"></span> Pricing Pack For You */}
          </h3>
          <div className="sub">
              <div>
              <p className="gen_p my_2" >
          Join Techluminate Academy and get access to top-quality technical training with our convenient subscription plans! Choose 1, 3, or 6 months and learn at your own pace. Upgrade your tech skills today!
              </p>
              </div>

          </div>
       
          <div className="row mt-5 g-5">
            <div className="col-12 col-md-6">
              <div className="pricing_left">
                <ul className="nav nav-pills nav-justified tabs_pannel">
                  <li className="nav-item">
                    <a
                      href="#Monthly"
                      className="nav-link active"
                      data-bs-toggle="tab"
                    >
                      Monthly
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#three_months"
                      className="nav-link"
                      data-bs-toggle="tab"
                    >
                      3 Month
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#six_months"
                      className="nav-link"
                      data-bs-toggle="tab"
                    >
                      6 Month
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="Monthly">
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      <input type="checkbox" name="" checked="checked" readOnly />
                    </label>
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      <input type="checkbox" name="" checked="checked" readOnly />
                    </label>
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      <input type="checkbox" name="" />
                    </label>
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      <input type="checkbox" name="" />
                    </label>
                  </div>
                  {/* <!-- monthly end --> */}

                  <div className="tab-pane fade" id="three_months">
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      {/* remove read only */}
                      <input type="checkbox" name="" checked="checked" readOnly />
                    </label>
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      <input type="checkbox" name="" />
                    </label>
                  </div>
                  <div className="tab-pane fade" id="six_months">
                    <label className="first">
                      <span className="text_for_field">
                        lorem ipsum text goes here
                      </span>
                      <input type="checkbox" name="" checked="checked" readOnly />
                    </label>
                  </div>
                </div>
              </div>
              {/* <!-- pricing left end --> */}
            </div>
            {/* <!-- left side end --> */}

            <div className="col-12 col-md-6">
              <div className="big_btn">
                <div className="row flex">
                  <div className="col-7 col-md-6">
                    <div className="forflex">
                      <img
                        src={check_mark}
                        className="img-fluid me-4"
                        alt="Check mark"
                      />
                      <div>
                        <h5 className="big_btn_text">Lorem Ipsum</h5>
                        <span className="sav_text">save 20%</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 col-md-6 text-center">
                    <h3 className="big_pric">$150</h3>
                    <span className="slash">/ Month</span>
                  </div>
                </div>
                {/* <!-- row end --> */}
              </div>
              {/* <!-- big btn end --> */}
              <a href="" className="apple_pay_btn">
                <img src={apple_pay} className="img-fluid" />
              </a>
              <h2 className="or_pay_with_card">
                <span>Or pay with card</span>
              </h2>
              <div className="card_form">
                <form>
                  <div className="row g-5">
                    <div className="col-12 col-md-6">
                      <label className="ps-3">Card number</label>
                      <input
                        type="text"
                        name=""
                        placeholder="1234 12334 1234 1234"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="row g-5">
                        <div className="col-6 ">
                          <label className="ps-4">CVV</label>
                          <input
                            type="text"
                            name=""
                            maxLength="3"
                            placeholder="123"
                          />
                        </div>
                        <div className="col-6">
                          <label className="ps-4">Expiry</label>
                          <input type="text" name="" placeholder="MM/YY" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* <!-- card form end --> */}
              <div className="text-center choose_plan_btn">
                <a href="#" className="hero_btn d-inline-block">
                  Choose a Plan
                </a>
              </div>
              {/* <!-- choose plan btn end --> */}
            </div>
            {/* <!-- right sid end --> */}
          </div>
          {/* <!-- row end --> */}
        </section>
        <Footer />
      </div>
    </Fragment>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(LandingPage)