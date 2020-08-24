import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnConnectedNavbar extends Component {
  render = () => {
    return (
      <div className="navbar">
        <img src="/logo.png" className="logo" />
        <Link to="/" className="nav">
          Home
        </Link>
        <Link to="/Store" className="nav">
          Store
        </Link>
        {this.props.loggedIn && (
          <Link to="/Post-ADV" className="nav">
            Post-Adv
          </Link>
        )}
        {this.props.loggedIn && (
          <Link to="/Logout" className="nav">
            Logout
          </Link>
        )}
        {!this.props.loggedIn && (
          <Link to="/SignUp" className="nav">
            Sign Up
          </Link>
        )}
        {!this.props.loggedIn && (
          <Link to="/Login" className="nav">
            Login
          </Link>
        )}
        <Link to="/cart" className="cart">
          ID: {this.props.username}
          <img src="/cart.svg" />
          <span>{this.props.cart.length}</span>
        </Link>
      </div>
    );
  };
}
let mapStateToProps = (state) => {
  return {
    items: state.items,
    username: state.username,
    loggedIn: state.loggedIn,
    cart: state.cart,
  };
};
let Navbar = connect(mapStateToProps)(UnConnectedNavbar);

export default Navbar;
