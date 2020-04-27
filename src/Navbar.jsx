import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route, BrowserRouter } from "react-router-dom";
import Auth from "./Auth.jsx";
class UnConnectedNavbar extends Component {
  render = () => {
    return (
      <div className="menu">
        <img src="/logo.png" className="logo" />
        <Link to="/" className="nav">
          Home
        </Link>
        <Link to="/Store" className="nav">
          Store
        </Link>
        {this.props.loggedIn ? (
          <span>
            <Link to="/Post-ADV" className="nav">
              Post-Adv
            </Link>
            <Link to="/LogOut" className="nav">
              Logout
            </Link>
          </span>
        ) : (
          <span>
            <Link to="/SignUp" className="nav">
              Sign Up
            </Link>
            <Link to="/Login" className="nav">
              Login
            </Link>
          </span>
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
let mapStateToProps = state => {
  return {
    items: state.items,
    username: state.username,
    loggedIn: state.loggedIn,
    cart: state.cart
  };
};
let Navbar = connect(mapStateToProps)(UnConnectedNavbar);

export default Navbar;
