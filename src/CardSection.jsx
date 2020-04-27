import React from "react";
import { CardElement } from "react-stripe-elements";

class CardSection extends React.Component {
  render() {
    return (
      <div className="card-info">
        <h3>Card details:</h3>
        <CardElement
          style={{
            base: {
              color: "black",
              fontWeight: 500,
              fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
              fontSize: "18px",
              fontSmoothing: "antialiased",
              "::placeholder": {
                color: "red"
              }
            }
          }}
        />
      </div>
    );
  }
}

export default CardSection;
