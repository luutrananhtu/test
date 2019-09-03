import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
import InputFilter from "../InputFilter/InputFilter";
import CategoriesList from "../CategoriesList/CategoriesList";

class SideBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: 300,
      maxPrice: 700
    };
  }

  changePrice = (minPrice, maxPrice) => {
    this.setState({ minPrice, maxPrice });
    console.log(this.state);
  };

  render() {
    const { onFilterClick } = this.props;
    return (
      <div className="sidebar">
        <div className="sidebar_section">
          <div className="sidebar_title">
            <h5>Product Category</h5>
          </div>
          <ul className="sidebar_categories">
            <CategoriesList
              onCategoriesClick={this.props.handleCategoryClick}
              categoriesList={this.props.categories}
            />
          </ul>
        </div>

        <div className="sidebar_section">
          <div className="sidebar_title">
            <h5>Filter by Price</h5>
          </div>
          <InputFilter
            minPrice={this.state.minPrice}
            maxPrice={this.state.maxPrice}
            changePrice={this.changePrice}
            onFilterClick={onFilterClick}
          />
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {};

export default SideBar;
