import React, { Fragment, useState, useEffect } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import setAlert from "../../actions/alert";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Payment = ({ setAlert }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const { state } = location;

  console.log(state);
  useEffect(() => {
    setLoading(false);
  }, []);

  console.log(window.location.origin);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    const { error, res } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:5174/confirmation`,
      },
    });
    navigate('/confirmation')
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    console.log(res);
    setIsProcessing(false);
  };
  console.log(stripe, elements);
  return (
    <Fragment>
      {!stripe || loading || !elements ? (
        <Spinner />
      ) : (
        <form
          id="payment-form"
          onSubmit={handleSubmit}
          style={{ marginTop: 250, paddingLeft: "5rem", paddingRight: "5rem" }}
        >
          <h2
            style={{
              fontSize: 40,
              color: "white",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            Payment Form
          </h2>
          {!elements && !stripe ? (
            <Spinner />
          ) : (
            <Fragment>
              <PaymentElement id="payment-element" />
              {!stripe && !elements ? (
                <Spinner />
              ) : (
                <button
                  className="pricing-buttn"
                  disabled={isProcessing || !stripe || !elements}
                >
                  <span id="button-text">
                    {isProcessing ? "Processing .... " : "Pay now"}
                  </span>
                </button>
              )}
            </Fragment>
          )}

          {message && <div id="payment-message">{message}</div>}
        </form>
      )}
    </Fragment>
  );
};

export default connect(null, { setAlert })(Payment);
