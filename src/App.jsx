import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { StripeProvider } from "react-stripe-elements";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import Auth from "./Auth.jsx";
import LogOut from "./LogOut.jsx";
import Store from "./Store.jsx";
import PostAdv from "./PostAdv.jsx";
import ItemDetails from "./ItemDetails.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";

class UnConnectedApp extends Component {
  activeSessionCheck = async () => {
    const response = await fetch("/session");
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success)
      this.props.dispatch({
        type: "logged-in-username",
        username: parsed.username
      });
  };
  componentDidMount() {
    this.activeSessionCheck();
  }
  renderItemDetails = routerData => {
    const itemId = routerData.match.params.itemId;
    if (itemId === undefined) return <div>No item found</div>;
    return <ItemDetails id={itemId} />;
  };
  render = () => {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/Store" component={Store} />
        <Route exact={true} path="/SignUp" component={SignUp} />
        <Route exact={true} path="/Login" component={Auth} />
        <Route exact={true} path="/LogOut" component={LogOut} />
        <Route exact={true} path="/Post-ADV" component={PostAdv} />
        <Route
          exact={true}
          path="/details/:itemId"
          render={this.renderItemDetails}
        />
        <Route exact={true} path="/cart" component={Cart} />
        <Route exact={true} path="/checkout" component={Checkout} />
      </BrowserRouter>
    );
  };
}

let App = connect()(UnConnectedApp);

export default App;
