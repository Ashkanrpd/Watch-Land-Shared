import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Slider } from "@material-ui/core";

const StyledSlider = withStyles({
  root: {
    color: "white",
  },
  valueLabel: {
    "& * ": {
      color: "black",
      background: "white",
      height: "40px",
      width: "40px",
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
    },
  },
})(Slider);

class UnConnectedFilterBar extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className="filter-bar">
        <h2>Filter by:</h2>

        <div className="combo">
          <div>Brand</div>
          <Autocomplete
            id="combo-box-demo"
            options={this.props.brands}
            getOptionLabel={(option) => option}
            onChange={this.props.chosenBrandFunc}
            value={this.props.chosenBrand}
            style={{ background: "white", width: "200px", borderRadius: "5px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                div="Search"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div className="slidecontainer">
          Price:
          <StyledSlider
            min={0}
            max={100000}
            step={1000}
            defaultValue={[10, 100000]}
            valueLabelDisplay="auto"
            onChange={this.props.changePriceFunc}
            value={this.props.price}
          />
        </div>
        <div onChange={this.props.changeGenderFunc}>
          <input
            type="radio"
            value="MEN"
            name="gender"
            readOnly={this.props.gender === "MEN"}
          />{" "}
          Men
          <input
            type="radio"
            value="WOMEN"
            name="gender"
            readOnly={this.props.gender === "WOMEN"}
          />{" "}
          Women
        </div>
        <div>
          Production Year{"  "}
          <input
            type="number"
            min={1990}
            max={2020}
            onChange={this.props.changeYearFunc}
            value={this.props.year}
          />
        </div>
        {this.props.loggedIn && (
          <div>
            My Ads Only
            <input type="checkbox" onChange={this.props.changeMyAdsFunc} />
          </div>
        )}
        <div>
          Search Item{"  "}
          <input
            type="text"
            maxLength="20"
            onChange={this.props.changeSearchFunc}
            value={this.props.searchInput}
          />
        </div>
        <div>
          <button onClick={this.props.changeResetFunc} className="btn">
            Reset
          </button>
        </div>
      </div>
    );
  };
}
let mapStateToProps = (state) => {
  return {
    items: state.items,
    username: state.username,
    loggedIn: state.loggedIn,
    brands: state.brands,
  };
};
let FilterBar = connect(mapStateToProps)(UnConnectedFilterBar);

export default FilterBar;
