import React, { Component } from "react";
import { connect } from "react-redux";
import { StripeProvider, Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "./InjectedCheckoutForm.jsx";

class UnConnectedCheckout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_e7y1PfGZ0UBQZZJJnkxIW75500bYlNZE74">
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}
let mapStateToProps = state => {
  return {
    items: state.items,
    username: state.username,
    loggedIn: state.loggedIn,
    cart: state.cart
  };
};
let Checkout = connect(mapStateToProps)(UnConnectedCheckout);

export default Checkout;
