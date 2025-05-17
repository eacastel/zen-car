import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

const StripeWrapper = ({ clientSecret, selections, total }) => {
  const options = { clientSecret };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm selections={selections} total={total} />
    </Elements>
  );
};

export default StripeWrapper;