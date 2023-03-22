import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {register} from "../../actions/auth";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import orderIcon from "../../assets/check_two.png"

 const Confirmation = ({register, registerDetails}) => {
     let navigate = useNavigate();
let location = useLocation();
console.log(location)
console.log(new URLSearchParams(location.search).get('redirect_status'))
let status = new URLSearchParams(location.search).get('redirect_status');
let firstName = Cookies.get('first-name')
console.log(firstName)
 registerDetails
console.log(registerDetails)
// const newUser = {
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     isSubscriptionConfirmed: true
// }

// console.log(status, newUser)
// useEffect(() => {
//     if(status !== "succeeded") return
//     register(newUser)
// }, [register])


const navigateToPaymentForm = () => {
    
    navigate("/create-account", {
      state: {
        status
      },
    });
  };
    return (
      <div className="subscription_main py__9">
      <div className="container">
        <div className="sub_main_box">
  
          <div className="row d-flex ">
            <div className="col-12 col-md-6 sub_left thanks_left_flx">
              <h2 className="sub_heading "> Order Summary</h2>
              <div className="plan_box">
                <div className="plan_content_box">
                  <span className="plan_text pt-5">Billed every month</span>
                  <h3 className="common_txt pt_3 ">Subscription Active Date</h3>
                  <h3 className="common_txt pt_3 mb_5">February 18, 2023 10:10 AM</h3>
  
                  <span className="plan_text">Next Billing Date</span>
                  <h3 className="common_txt pt_3 pb-5">May 18, 2023 10:10 AM</h3>
                </div>
              </div>
            </div>
  
            <div className="col-12 col-md-6 sub_right mt-5 mt-md-0 d-flex align-items-center">
              <div className="right_content_box">
                
                <span className="check_btn">
                  <img src={orderIcon} />
                  <span>Order Successfully Placed</span>
                </span>
  
                <h2 className="common_txt text-center py-5">For your Order</h2>
                <p className="order_text">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 
                </p>
                <a onClick={navigateToPaymentForm} href="" className="view_details_btn">Create Account</a>
  
              </div>
              {/* <!-- right content box end --> */}
            </div>
          </div>
          {/* <!-- row end --> */}
        </div>
      </div>
      {/* <!-- container end --> */}
    </div>

      //    {/* <div style={{width: "50%", padding: '2rem', marginTop: 200}}>
      //    <button
      //   style={{ backgroundColor: "#f38611", textTransform: 'uppercase' }}
      //     type="button"
      //     onClick={navigateToPaymentForm}
      //     className="pricing-buttn-two"
      //   >
      //     Create Account
      //   </button>
      // </div> */}
    )
}


const mapStateToProps = state => ({
    registerDetails: state.auth,
  });

export default connect(mapStateToProps, {register})(Confirmation);