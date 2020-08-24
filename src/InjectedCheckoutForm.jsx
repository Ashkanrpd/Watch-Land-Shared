import React from "react";
import { injectStripe } from "react-stripe-elements";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import CardSection from "./CardSection.jsx";

class UnConnectedCheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  handleSubmit = (ev) => {
    ev.preventDefault();
    const cardElement = this.props.elements.getElement("card");
    this.props.stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: "Jenny Rosen" },
    });
  };
  paymentFunc = async (evt) => {
    evt.preventDefault();
    this.props.cart.map(async (item) => {
      let data = new FormData();
      data.append("id", item._id);
      await fetch("/deleteAd", { method: "POST", body: data });
    });
    this.props.dispatch({ type: "clearCart" });
    this.setState({ redirect: true });
    alert("Your order has been placed successfully");
  };

  render() {
    return this.state.redirect ? (
      <Redirect push to="/Store" />
    ) : (
      <div className="payment-container">
        <form onSubmit={this.handleSubmit} className="payment">
          <CardSection />
          <button onClick={this.paymentFunc} className="btn">
            Confirm order
          </button>
          <Link to={"/Store"} className="btn">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
let CheckoutForm = connect(mapStateToProps)(UnConnectedCheckoutForm);

export default injectStripe(CheckoutForm);
