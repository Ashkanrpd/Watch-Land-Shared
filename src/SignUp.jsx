import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

class UnConnectedSignUp extends Component {
  constructor() {
    super();
    this.state = {
      usernameSignUpInput: "",
      passwordSignUpInput: "",
      signedUp: false,
    };
  }
  usernameSignUpChange = (evt) => {
    this.setState({ usernameSignUpInput: evt.target.value });
  };
  passwordSignUpChange = (evt) => {
    this.setState({ passwordSignUpInput: evt.target.value });
  };
  signUpHandler = async (evt) => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.usernameSignUpInput);
    data.append("password", this.state.passwordSignUpInput);
    let response = await fetch("/SignUp", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      alert("Signed up Successfully");
      this.setState({ signedUp: true });
      return;
    }
    alert(" Username is already taken!");
    this.setState({
      usernameSignUpInput: "",
      passwordSignUpInput: "",
      signedUp: false,
    });
  };
  render = () => {
    return this.state.signedUp ? (
      <Redirect push to="/Store" />
    ) : (
      <div className="signup-container">
        <h1 className="register-title">Welcome</h1>
        <form onSubmit={this.signUpHandler} className={"register"}>
          <h3>Sign Up:</h3>
          <div>Username:</div>
          <input
            type="text"
            onChange={this.usernameSignUpChange}
            className={"register-input"}
            minLength={4}
            maxLength={8}
            placeholder={"4-8 letters"}
            title={"4-8 letters"}
          ></input>
          <div>Password:</div>
          <input
            type="password"
            onChange={this.passwordSignUpChange}
            className={"register-input"}
            minLength={8}
            maxLength={12}
            placeholder={"8-12 characters"}
            title={"8-12 characters"}
          ></input>
          <input type="submit" className="register-button"></input>
          <Link to={"/Store"}>
            <button className="register-button">Cancel</button>
          </Link>
          <div className="register-link">
            Already have an account? <Link to={"/Login"}>Sign in</Link>
          </div>
        </form>
      </div>
    );
  };
}

let mapStateToProps = (state) => {
  return {};
};
let SignUp = connect(mapStateToProps)(UnConnectedSignUp);
export default SignUp;
