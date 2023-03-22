import React, { useState, useRef } from "react";
import { addDays } from "date-fns";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import setAlert from "../../actions/alert";
// import { setSecret } from "../../actions/auth";
import {format} from 'date-fns';


import axios from "axios";
const SubScriptions = ({ setAlert }) => {
  const customerId = Cookies.get("customer");
  const location = useLocation();
  let navigate = useNavigate();
  const { state } = location;
  const newUser = useRef(state);
  let user = newUser.current;
  console.log(location, user);
  const [totalPlan, setPurchaseSummary] = useState({
    total: "49.99",
    planAccess: "monthly",
    start: new Date(),
    end: addDays(new Date(), 30),
  });
  const [planList, setPlan] = useState({
    basic: "basic",
    standard: "",
    premium: "",
    price: "price_1MVKuSJX9pVYcKSoSwcpCyJ7",
  });

  const [isSubscriptionValid, setPickedSubs] = useState(false);
  const { total, planAccess, start, end } = totalPlan;

  const { basic, standard, premium, price } = planList;
  console.log(basic, standard, premium, price, total, planAccess, start, end, "hello");
  const createSubscription = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const subscriptionOrder = {
      price,
      customerId,
    };
    try {
      const body = JSON.stringify(subscriptionOrder);
      const res = await axios.post(
        "http://localhost:5000/create-subscription",
        body,
        config
      );
      setAlert("Package Successfully Selected", "success_mesg");
      console.log(res.data);

      Cookies.set("clientSecret", res.data.clientSecret);
      navigate("/order-summary", {
        state: {
          user,
          totalPlan,
          customerId,
          clientSecret: res.data.clientSecret,
        },
      });
    } catch (error) {
      setAlert(`${error.message}`, "danger_mesg");
    }
  };

  const selectProduct = plan => {
    switch (plan) {
      case "basic":
        setPlan(prevState => ({
          ...prevState,
          basic: "basic",
          standard: "",
          premium: "",
          price: `price_1MVKuSJX9pVYcKSoSwcpCyJ7`,
        }));
        setPurchaseSummary(prevState => ({
          ...prevState,
          total: "49.99",
          planAccess: "monthly",
          start: new Date(),
          end: addDays(new Date(), 30),
        }));
        break;
      case "standard":
        setPlan(prevState => ({
          ...prevState,
          basic: "",
          standard: "standard",
          premium: "",
          price: `price_1MVKuSJX9pVYcKSoSwcpCyJ7`,
        }));
        setPurchaseSummary(prevState => ({
          ...prevState,
          total: "129.99",
          planAccess: "3 months",
          start: new Date(),
          end: addDays(new Date(), 90),
        }));
        break;
      case "premium":
        setPlan(prevState => ({
          ...prevState,
          basic: "",
          standard: "",
          premium: "premium",
          price: `price_1MVKwtJX9pVYcKSokKFl1gAR`,
        }));
        setPurchaseSummary(prevState => ({
          ...prevState,
          total: "159.99",
          planAccess: "6 months",
          start: new Date(),
          end: addDays(new Date(), 180),
        }));
        break;

      default:
        break;
    }
  };

  let startDateFormatted = format(start, "MMMM dd, yyyy");
  let endDateFormatted = format(end, "MMMM dd, yyyy");
  
  return (

    <div className="subscription_main py__9">
		<div className="container" style={{maxWidth: "100%"}}>
			<div className="sub_main_box">

				<div className="row">
					<div className="col-12 col-md-6 sub_left">

						<a href="#" className="back_link">
							<i className="fa fa-angle-left"></i>
									Back
							</a>
						<h2 className="sub_heading"> Subscription</h2>
						<div className="plan_box">
							<div className="plan_content_box">
								<span className="plan_text">Plan</span>
								<h3 className="common_txt pt_3 mb_5">Billed monthly</h3>

								<span className="plan_text">Price</span>
								<h3 className="common_txt pt_3 pb-4">{total}</h3>
							</div>

							<div className="plan_content_box mt-5">
								<span className="plan_text">Date</span>
								<div className="row py-4">
									<div className="col-6 text-start ps-4 ">
										<span className="start_text">Start</span>
										<span className="common_txt" style={{fontSize: 15, display: 'block'}}>{startDateFormatted}</span>
									</div>

									<div className="col-6 text-end">
										<span className="start_text ">End</span>
										<span className="common_txt pe_3" style={{fontSize: 15, display: 'block'}}>{endDateFormatted}</span>
									</div>
								</div>
							</div>


						</div>
					</div>
					<div className="col-12 col-md-6 sub_right mt-5 mt-md-0">
						<div className="right_content_box">
						<ul className="nav nav-pills nav-justified tabs_pannel">

					    <li className="nav-item" onClick={() => selectProduct("basic")}>
					        <a
                     style={{ pointerEvents: "none" }}
                   href="#" className={`nav-link ${basic && "active"}`} >Monthly</a>
					    </li>
					    <li className="nav-item" onClick={() => selectProduct("standard")}>
					        <a 
                     style={{ pointerEvents: "none" }}
                  href="#" className={`nav-link ${standard && "active"}`} >3 Month</a>
					    </li>
					    <li className="nav-item" onClick={() => selectProduct("premium")}>
					        <a
                     style={{ pointerEvents: "none" }}
                   href="#" className={`nav-link ${premium && "active"}`} >6 Month</a>
					    </li>
					</ul>
					<div className="tabs_data">
						<div className="tab-content">
					    <div  className={`tab-pane fade ${basic !== "basic" ? " " : "show active"}`} id="Monthly">
									<h2 className="pkg_heading"> the package includes</h2>

					       <label className="first">
					       	<span className="text_for_field">2 Access to all available courses onplatform</span>
					       	<input type="checkbox" name="" checked="checked" />
					       </label>
					       <label className="first">
					       	<span className="text_for_field">lorem ipsum text goes here</span>
					       	<input type="checkbox" name=""  checked="checked"/>
					       </label>
					       <label className="first">
					       	<span className="text_for_field">lorem ipsum text goes here</span>
					       	<input type="checkbox" name=""/>
					       </label>

					    </div>

					    <div  className={`tab-pane fade ${standard === "standard" ? "show active" : " "}`} id="three_months">
									<h2 className="pkg_heading"> the package includes</h2>

					        <label className="first">
					       	<span className="text_for_field">lorem ipsum text goes here</span>
					       	<input type="checkbox" name=""  checked="checked"/>
					       </label>
					       <label className="first">
					       	<span className="text_for_field">lorem ipsum text goes here</span>
					       	<input type="checkbox" name=""/>
					       </label>
					    </div>
					    <div className={`tab-pane fade ${premium === "premium" ? "show active" : " "} `} id="six_months">
									<h2 className="pkg_heading"> the package includes</h2>

					       <label className="first">
					       	<span className="text_for_field">lorem ipsum text goes here</span>
					       	<input type="checkbox" name=""  checked="checked"/>
					       </label>
					    </div>
					</div>
					</div>

          <button
              onClick={createSubscription}
              type="button"
              className="pricing-buttn"
            >
              Submit
            </button>


						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    // <div className="sub-mobile ">
    //   <div className="sub-mobile-two">

   
    //   <div  style={{ border: "1px solid white",  borderRadius: 8, marginBottom: 10, height: '100%' }}>
      
    //         <div style={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
    //           <h3 className="hero_heading" id="h1-mobile">
    //             Subscription
    //           </h3>
    //         </div>

    //         <div style={{ display: "flex", justifyContent: "space-around" }}>
    //           <div>
    //             <h2 className="sub-title">Plan</h2>
    //             <p className="hero_p sub-text">
    //               {planAccess === "monthly"
    //                 ? `Billed ${planAccess}`
    //                 : `Billed every ${planAccess}`}
    //             </p>
    //           </div>
    //           <div>
    //             <h2 className="sub-title">Price</h2>
    //             <p className="hero_p sub-text">{total ? `$${total}` : ""}</p>
    //           </div>
    //         </div>
    //         <div style={{ display: "flex", justifyContent: "space-around" }}>
    //           <div>
    //             <h2 className="sub-title">Start</h2>
    //             <p className="hero_p sub-text">
    //               {start ? `${startDateFormatted}` : ""}
    //             </p>
    //           </div>
    //           <div>
    //             <h2 className="sub-title">  Date</h2>
    //             <p className="hero_p sub-text">
    //               {end ? `${endDateFormatted}` : ""}
    //             </p>
    //           </div>
    //         </div>
       
      
    //   </div>
    //   </div>

    //   <div className="sub-mobile-two">
    //     <div className="pricing_left">
    //       <ul className="nav nav-pills nav-justified tabs_pannel">
    //         <li className="nav-item" onClick={() => selectProduct("basic")}>
    //           <a
    //             style={{ pointerEvents: "none" }}
    //             href="#three_monthsy"
    //             className={`nav-link ${basic && "active"}`}
    //           >
    //             Monthly
    //           </a>
    //         </li>
    //         <li className="nav-item" onClick={() => selectProduct("standard")}>
    //           <a
    //             style={{ pointerEvents: "none" }}
    //             href="#three_monthsy"
    //             className={`nav-link ${standard && "active"}`}
    //           >
    //             3 Month
    //           </a>
    //         </li>
    //         <li className="nav-item" onClick={() => selectProduct("premium")}>
    //           <a
    //             style={{ pointerEvents: "none" }}
    //             href="#three_monthsy"
    //             className={`nav-link ${premium && "active"}`}
    //           >
    //             6 Month
    //           </a>
    //         </li>
    //       </ul>
    //       <div className="tab-content">
    //         <div
    //           className={`tab-pane fade ${basic && "show active"}`}
    //           id="Monthly"
    //         >
    //           <label className="first">
    //             <span className="text_for_field">
    //               2 Access to all available courses on the platform
    //             </span>
    //             <input type="checkbox" name="" checked="checked" readOnly />
    //           </label>
    //           <label className="first">
    //             <span className="text_for_field">
    //               Access to discussion group.
    //             </span>
    //             <input type="checkbox" name="" checked="checked" readOnly />
    //           </label>
    //           <label className="first">
    //             <span className="text_for_field">
    //               Automatic placement on blog list.
    //             </span>
    //             <input type="checkbox" name="" />
    //           </label>
    //         </div>

    //         <div
    //           className={`tab-pane fade ${standard && "show active"}`}
    //           id="three_months"
    //         >
    //           <label className="first">
    //             <span className="text_for_field">
    //               3 Access to all available courses on the platform
    //             </span>

    //             <input type="checkbox" name="" checked="checked" readOnly />
    //           </label>
    //           <label className="first">
    //             <span className="text_for_field">
    //               Access to discussion group.
    //             </span>
    //             <input type="checkbox" name="" />
    //           </label>
    //         </div>
    //         <div
    //           className={`tab-pane fade ${premium && "show active"}`}
    //           id="six_months"
    //         >
    //           <label className="first">
    //             <span className="text_for_field">
    //               Automatic placement on blog list.
    //             </span>
    //             <input type="checkbox" name="" checked="checked" readOnly />
    //           </label>
    //         </div>
    //         <button
    //           onClick={createSubscription}
    //           type="button"
    //           className="pricing-buttn"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default connect(null, { setAlert })(SubScriptions);
