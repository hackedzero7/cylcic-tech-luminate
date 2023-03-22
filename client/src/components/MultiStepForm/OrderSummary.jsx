import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import formatDate from "../../Hooks/FormatDates/Format";
import Cookies from "js-cookie";
const OrderSummary = () => {
  const style = {
    subContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "black",
      border: ".1px solid white",
      padding: "7rem",
      margin: "1rem",
      borderRadius: "2rem",
      fontFamily: "Arial",
    },
    textStyle: {
      color: "white",
      fontSize: 20,
    },
  };



  const location = useLocation();
  let navigate = useNavigate();
  console.log(location);
  const { state } = location;
  console.log(state);
console.log(Cookies.get('first'))

  let startDate = state && state.totalPlan.start;
  let endDate = state && state.totalPlan.end;
  console.log(startDate, endDate);
  let formattedStartDate = state
    ? formatDate(startDate)
    : "";
  let formattedEndDate = state ? formatDate(endDate) : "";

  const navigateToPaymentForm = () => {
    
    navigate("/checkout-form", {
      state: {
        state,
        clientSecret: state.clientSecret,
      },
    });
  };
  return (
    <div class="summary_main_container">
		<div class="summary_main_box">
						<h2 class="sub_heading "> Order Summary</h2>
						<div class="plan_box">
							<div class="plan_content_box">
								<span class="plan_text pt-5">Billed every month</span>
								<h3 class="common_txt pt_3 ">Subscription Active Date</h3>
								<h3 class="common_txt pt_3 mb_5"> {formattedStartDate ? formattedStartDate : "" }</h3>

								<span class="plan_text">Next Billing Date</span>
								<h3 class="common_txt pt_3 pb-5"> {formattedEndDate ? formattedEndDate : ""}</h3>
							</div>
              <button
   style={{ backgroundColor: "#f38611", textTransform: 'uppercase' }}
           type="button"
      onClick={navigateToPaymentForm}
          className="pricing-buttn-two"
      >
        Go to Payment
 </button>
						</div>
					</div>
	</div>
    // <div style={{ display: "flex", justifyContent: "center", margin: "10rem", }}>
    //   <div style={style.subContainer}>
    //     <div>
    //       <h1 style={{ color: "white", fontSize: 50 }}>Order Summary</h1>
    //       <p style={Object.assign(style.textStyle, {marginTop: 25}) }>
    //         Billed every {state ? state.totalPlan.planAccess : ""}
    //       </p>
    //       <p style={style.textStyle}>
    //         {" "}
    //         Subscription Active Date <br />
    //         {formattedStartDate}
    //       </p>
    //       <p style={style.textStyle}>
    //         {" "}
    //         Next Billing Date <br />
    //         {formattedEndDate ? formattedEndDate : ""}
    //       </p>
    //     </div>
    //     <div style={{width: "100%"}}>
    //       <button
    //       style={{ backgroundColor: "#f38611", textTransform: 'uppercase' }}
    //         type="button"
    //         onClick={navigateToPaymentForm}
    //         className="pricing-buttn-two"
    //       >
    //         Login to Dashboard
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderSummary;
