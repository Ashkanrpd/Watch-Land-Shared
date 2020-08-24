import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnConnectedItems extends Component {
  constructor(props) {
    super(props);
  }

  getAllItems = async () => {
    let response = await fetch("/getItems");
    let body = await response.text();
    body = JSON.parse(body);
    this.props.dispatch({ type: "render-items", items: body });
  };
  componentDidMount() {
    this.getAllItems();
  }

  render = () => {
    let filtered = this.props.items.filter((item) => {
      const includesseqrchTerm = item.description
        .toLowerCase()
        .includes(this.props.searchInput.toLowerCase());
      const includesMyAds = this.props.myAds
        ? item.username === this.props.username
        : true;
      const includesBrand = this.props.chosenBrand
        ? item.brand === this.props.chosenBrand
        : true;
      const includesYear = this.props.year
        ? item.year === this.props.year
        : true;
      const includesPriceRange = this.props.price
        ? item.price > this.props.price[0] && item.price <= this.props.price[1]
        : true;
      const includesGender = this.props.gender
        ? item.gender === this.props.gender
        : true;
      return (
        includesseqrchTerm &&
        includesMyAds &&
        includesBrand &&
        includesYear &&
        includesPriceRange &&
        includesGender
      );
    });
    return filtered.length > 0 ? (
      <div className="items">
        {filtered.map((item) => {
          return (
            <div key={item._id} className="item">
              <h3> {item.brand}</h3>
              <img src={item.imagePath}></img>
              <div className="des">
                <span>{item.description}</span>
              </div>
              <div className="title"></div>
              <span>{item.price} $</span>
              <div>
                <Link
                  to={{
                    pathname: "/details/" + item._id,
                    id: item._id,
                  }}
                  className="btn"
                >
                  More Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <h3 className="center-msg"> No Match Found!</h3>
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
let Items = connect(mapStateToProps)(UnConnectedItems);

export default Items;
