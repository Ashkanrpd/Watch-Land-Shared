import React, { Component } from "react";
import { connect } from "react-redux";

class UnConnectedLogOut extends Component {
  logoutHandler = async () => {
    const response = await fetch("/Logout", { method: "POST" });
    const body = await response.text();
    const parsed = JSON.parse(body);

    if (parsed.success)
      this.props.dispatch({
        type: "Logged-Out",
        username: "",
        loggedIn: false
      });
  };
  componentDidMount() {
    this.logoutHandler();
  }
  render = () => {
    return (
      <div className="logout-container">
        <h1 className="logout">You Logged Out Successfully!</h1>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn
  };
};
let LogOut = connect(mapStateToProps)(UnConnectedLogOut);

export default LogOut;
