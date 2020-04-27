import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route, BrowserRouter } from "react-router-dom";
import Items from "./items.jsx";
import Navbar from "./Navbar.jsx";
import FilterBar from "./FilterBar.jsx";

class UnConnectedStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myAdsOnly: false,
      chosenBrand: "",
      searchInput: "",
      yearInput: "",
      priceInput: [0, 100000],
      genderInput: undefined
    };
  }
  changeMyAdsInput = () => {
    this.setState({ myAdsOnly: !this.state.myAdsOnly });
  };
  chosenBrandInput = (_, input) => {
    this.setState({ chosenBrand: input });
  };
  changeSearchInput = input => {
    this.setState({ searchInput: input.target.value });
  };
  changeYearInput = input => {
    this.setState({ yearInput: input.target.value });
  };
  changePriceInput = (_, input) => {
    this.setState({ priceInput: input });
  };
  changeGenderInput = input => {
    this.setState({ genderInput: input.target.value });
  };
  changeResetInput = () => {
    this.setState({
      myAdsOnly: false,
      chosenBrand: "",
      searchInput: "",
      yearInput: "",
      priceInput: [0, 100000],
      genderInput: undefined
    });
  };

  render = () => {
    return (
      <div>
        <Navbar />
        <FilterBar
          changeMyAdsFunc={this.changeMyAdsInput}
          chosenBrandFunc={this.chosenBrandInput}
          changeSearchFunc={this.changeSearchInput}
          changeYearFunc={this.changeYearInput}
          changePriceFunc={this.changePriceInput}
          changeGenderFunc={this.changeGenderInput}
          changeResetFunc={this.changeResetInput}
          myAds={this.state.myAdsOnly}
          chosenBrand={this.state.chosenBrand}
          searchInput={this.state.searchInput}
          year={this.state.yearInput}
          price={this.state.priceInput}
          gender={this.state.genderInput}
        />
        <Items
          myAds={this.state.myAdsOnly}
          chosenBrand={this.state.chosenBrand}
          searchInput={this.state.searchInput}
          year={this.state.yearInput}
          price={this.state.priceInput}
          gender={this.state.genderInput}
        />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    items: state.items,
    username: state.username,
    loggedIn: state.loggedIn
  };
};
let Store = connect(mapStateToProps)(UnConnectedStore);

export default Store;
