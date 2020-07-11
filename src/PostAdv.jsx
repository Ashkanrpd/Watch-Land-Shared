import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Items from "./items.jsx";
import Navbar from "./Navbar.jsx";

class UnConnectedPostAdv extends Component {
  constructor() {
    super();
    this.state = {
      chosenBrand: "",
      description: "",
      file: "",
      price: "",
      year: "",
      gender: undefined,
      justPosted: false,
      imgURL: "",
    };
  }
  brandChangeHandler = (_, value) => this.setState({ chosenBrand: value });
  descChangeHandler = (evt) => this.setState({ description: evt.target.value });
  fileChangeHandler = (evt) => {
    this.setState({
      file: evt.target.files[0],
      imgURL: URL.createObjectURL(evt.target.files[0]),
    });
  };
  priceChangeHandler = (evt) => this.setState({ price: evt.target.value });
  yearChangeHandler = (evt) => this.setState({ year: evt.target.value });
  genderChangeHandler = (evt) => this.setState({ gender: evt.target.value });

  submitHandler = async (evt) => {
    evt.preventDefault();
    let data = new FormData();
    data.append("brand", this.state.chosenBrand);
    data.append("img", this.state.file);
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("year", this.state.year);
    data.append("gender", this.state.gender);
    data.append("owner", this.props.username);
    await fetch("/newAdv", { method: "POST", body: data });
    this.setState({
      chosenBrand: "",
      description: "",
      file: "",
      price: "",
      year: "",
      justPosted: true,
      gender: undefined,
    });
    alert("Your Ad posted Successfully");
  };
  render = () => {
    return this.state.justPosted ? (
      <Redirect push to="/Store" />
    ) : (
      <div>
        <Navbar />
        <div className="post">
          <div className="post-img">
            {this.state.imgURL ? (
              <img src={this.state.imgURL}></img>
            ) : (
              <span>Your image will be shown here</span>
            )}
          </div>
          <form onSubmit={this.submitHandler} className="post-details">
            <h2>Make your own advertisment</h2>
            <div>
              Brand name:
              <Autocomplete
                id="combo-box-demo"
                options={this.props.brands}
                getOptionLabel={(option) => option}
                onChange={this.brandChangeHandler}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <div>
              Description:
              <textarea
                type="text"
                onChange={this.descChangeHandler}
                rows={3}
                cols={20}
                className="moreWidth"
                required
              ></textarea>
            </div>
            <div>
              Upload an image:
              <input
                type="file"
                onChange={this.fileChangeHandler}
                required
              ></input>
            </div>
            <div>
              Price:
              <input
                type="number"
                min={1}
                max={100000}
                onChange={this.priceChangeHandler}
                required
              ></input>
              $
            </div>
            <div>
              Production year:
              <input
                type="number"
                placeholder="YYYY"
                min={1990}
                max={2020}
                onChange={this.yearChangeHandler}
                required
              />
            </div>
            <div onChange={this.genderChangeHandler} required>
              For:
              <input type="radio" value="MEN" name="gender" /> Men
              <input type="radio" value="WOMEN" name="gender" /> Women
            </div>

            <input type="submit" className={"btn"}></input>
          </form>
        </div>
      </div>
    );
  };
}

let mapStateToProps = (state) => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    brands: state.brands,
  };
};
let PostAdv = connect(mapStateToProps)(UnConnectedPostAdv);

export default PostAdv;
