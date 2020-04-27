import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";

class UnConnectedCart extends Component {
  removeItem = idx => {
    this.props.dispatch({ type: "deleteFromCart", idx: idx });
  };
  render() {
    let totalPrice = 0;
    return (
      <div>
        <Navbar />
        <div className="cart-container">
          <h2>Your Cart</h2>
          <ul>
            {this.props.cart.map((item, idx) => {
              totalPrice = Number(totalPrice) + Number(item.price);
              return (
                <li className="cart-items">
                  <img src={item.imagePath}></img>
                  <Link
                    to={{
                      pathname: "/details/" + item._id,
                      id: item._id
                    }}
                  >
                    {(item.brand, item.description)}
                  </Link>
                  <div> {item.price}$ </div>
                  <button onClick={() => this.removeItem(idx)} className="btn">
                    Remove Item
                  </button>
                </li>
              );
            })}
          </ul>
          <h3 className="cart-total">
            Total Price: {totalPrice} $
            <Link to={"/checkout"}>
              <button className="btn"> checkout </button>
            </Link>
          </h3>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    cart: state.cart,
    brands: state.brands
  };
};
let Cart = connect(mapStateToProps)(UnConnectedCart);
export default Cart;
