import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnConnectedHome extends Component {
  render = () => {
    return (
      <div className="home-container">
        <div className="home">
          <h1> Welcome To Watch-Land</h1>
          <h3> Sell and Buy your watch</h3>
          <h3> Different experience of online shopping</h3>
          <Link to="/Store" className="btn">
            Visit the Store
          </Link>
        </div>
      </div>
    );
  };
}
let mapStateToProps = (state) => {
  return { username: state.username, loggedIn: state.loggedIn };
};
let Home = connect(mapStateToProps)(UnConnectedHome);

export default Home;
