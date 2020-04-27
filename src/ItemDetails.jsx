import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
class UnConnectedItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  getItem = async () => {
    let id = this.props.id;
    console.log(this.props.id);
    let data = new FormData();
    data.append("id", id);
    let response = await fetch("/findItem", { method: "POST", body: data });
    let body = await response.text();
    console.log(body);
    body = JSON.parse(body);
    console.log(body);

    this.setState({ item: body });
  };
  componentDidMount() {
    this.getItem();
  }
  deleteAd = async id => {
    let data = new FormData();
    data.append("id", id);
    fetch("/deleteAd", { method: "POST", body: data });
    let response = await fetch("/getItems");
    let body = await response.text();
    body = JSON.parse(body);
    this.props.dispatch({ type: "render-items", items: body });
    this.getItem();
  };
  addToCart = item => {
    this.props.dispatch({ type: "addToCart", item: item });
  };

  render = () => {
    const { item } = this.state;
    return (
      <div>
        <Navbar />
        <div className="details">
          <div>
            <img src={item.imagePath}></img>
          </div>
          <div>
            <h1> {item.brand}</h1>
            <div>{item.description} </div>
            <div>Production year: {item.year}</div>
            <div>{item.gender}</div>
            <h2>{item.price} $ </h2>
            {this.props.username === item.username && this.props.loggedIn && (
              <button onClick={() => this.deleteAd(item._id)} className={"btn"}>
                Delete Item
              </button>
            )}
            <button
              onClick={() => {
                this.props.username
                  ? this.addToCart(item)
                  : alert("You need to login first!");
              }}
              className={"btn"}
            >
              Add to Cart
            </button>
          </div>
        </div>
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
let ItemDetails = connect(mapStateToProps)(UnConnectedItemDetails);

export default ItemDetails;
