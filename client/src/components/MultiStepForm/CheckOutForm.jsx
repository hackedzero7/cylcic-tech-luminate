import React, { useState, useEffect } from "react";
import Payment from "./Payment";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { Fragment } from "react";
import Spinner from "../Spinner/Spinner";

const CheckOutForm = () => {
  const location = useLocation();
  const { state } = location;
  let secret = state.clientSecret;

  const [clientSecret, setClientSecret] = useState(null);
  const stripeTestPromise = loadStripe(
    `pk_test_51MMhj4JX9pVYcKSo1723htdL74D90A7NKA9nDDrLVFfv3vI38649n8YLUUUy4qnH8FtWVDctUff3hQTz2VP0DH3T00jTEzgJL5`
  );
  useEffect(() => {
    setClientSecret(secret);
    console.log(secret);
  }, [secret]);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance: {
      theme: "night",
      labels: "floating",
    },
  };
  return (
    <Fragment>
      {clientSecret ? (
        <Elements stripe={stripeTestPromise} options={options}>
          <Payment />
        </Elements>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default CheckOutForm;
