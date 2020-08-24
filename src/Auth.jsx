import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

class UnAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameLoginInpit: "",
      passwordLoginInput: "",
    };
  }
  usernameLoginChange = (evt) => {
    this.setState({ usernameLoginInput: evt.target.value });
  };
  passwordLoginChange = (evt) => {
    this.setState({ passwordLoginInput: evt.target.value });
  };
  loginHandler = async (evt) => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.usernameLoginInput);
    data.append("password", this.state.passwordLoginInput);
    let response = await fetch("/Login", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      this.props.dispatch({
        type: "logged-in-username",
        username: this.state.usernameLoginInput,
      });
      alert("Logged in Successfully");
      return;
    }
    alert("Wrong username or password");
  };

  render = () => {
    return this.props.loggedIn ? (
      <Redirect push to="/Store" />
    ) : (
      <div className="login-container">
        <h1 className="register-title">Welcome</h1>
        <form onSubmit={this.loginHandler} className={"register"}>
          <h3> Login:</h3>
          <div>Username:</div>
          <input
            type="text"
            onChange={this.usernameLoginChange}
            className={"register-input"}
            minLength={"4"}
            maxLength={"8"}
            placeholder={"4-8 letters"}
          ></input>
          <div>Password:</div>
          <input
            type="password"
            onChange={this.passwordLoginChange}
            className={"register-input"}
            minLength={"8"}
            maxLength={"12"}
            placeholder={"8-12 characters"}
          ></input>
          <input type="submit" className="register-button"></input>
          <Link to={"/Store"}>
            <button className="register-button">Cancel</button>
          </Link>
          <div className="register-link">
            New to Watch-Land? <Link to={"/SignUp"}> Sign up</Link>
          </div>
        </form>
      </div>
    );
  };
}

let mapStateToProps = (state) => {
  return { username: state.username, loggedIn: state.loggedIn };
};
let Auth = connect(mapStateToProps)(UnAuth);
export default Auth;
