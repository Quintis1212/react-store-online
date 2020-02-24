import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import PropTypes from "prop-types";

class Products extends Component {
  state = {
    selected: true,
    selectedMin: 0,
    selectedMax: 0,
    min: 0,
    max: 0
  };

  static getDerivedStateFromProps(props, state) {
    const { minPrice, maxPrice } = props.data;
    if (minPrice !== state.min || maxPrice !== state.max) {
      return {
        min: minPrice,
        selectedMin: minPrice,
        max: maxPrice,
        selectedMax: maxPrice
      };
    } else {
      return {};
    }
  }

  brandHandler = e => {
    let brandVar = e.target.value;
    this.props.filter({ brand: brandVar === "All" ? null : brandVar });
  };
  handleOnChange(e) {
    console.log(e);
    let minPrice = e[0];
    let maxPrice = e[1];
    this.setState({ selectedMin: minPrice, selectedMax: maxPrice });
    this.props.filter({ price: { min: minPrice, max: maxPrice } });
  }

  render() {
    let brandArr = [];
    this.props.data.brandData.forEach(el => {
      brandArr.push(el.brand);
    });

    brandArr = ["All", ...new Set(brandArr)];

    const { minPrice, maxPrice } = this.props.data;
    const { selectedMin, selectedMax } = this.state;
    const { filters } = this.props.data;
    return (
      <div className="search-and-products-container">
        <div className="filter-table">
          <label htmlFor="filter-by-brand">Choose your brand : </label>
          <select
            value={(filters && filters.brand) || "All"}
            onChange={e => this.brandHandler(e)}
            id="filter-by-brand"
          >
            {brandArr.map(el => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <div className="price-range">
            <h3 className="range-title">
              Min price : {this.state.selectedMin} ${" "}
            </h3>
            <h3 className="range-title">
              Max price : {this.state.selectedMax} $
            </h3>
            <Range
              min={minPrice}
              max={maxPrice}
              value={[selectedMin, selectedMax]}
              step={1}
              allowCross={false}
              onChange={e => this.handleOnChange(e)}
            />
          </div>
        </div>
        <div>
          <ProductList dataList={this.props.data.data} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state
  }),
  dispatch => ({
    filter: filters => {
      dispatch({ type: "FILTER", filters });
    }
  })
)(Products);

Products.propTypes = {
  dataList: PropTypes.array,
  data: PropTypes.shape({
    id: PropTypes.number,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    brandData: PropTypes.array,
    staticData: PropTypes.array,
    data: PropTypes.array,
    selectedValue: PropTypes.string
  })
};
