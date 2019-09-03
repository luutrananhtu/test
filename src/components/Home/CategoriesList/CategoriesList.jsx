import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import Catergories from "../Categories/Catergories";

class CategoriesList extends PureComponent {
  render() {
    const { onCategoriesClick, cls } = this.props;

    return (
      <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
        {" "}
        {this.props.categoriesList.map(c => {
          return (
            <Catergories
              onCategoriesClick={onCategoriesClick}
              key={c.id}
              categories={c}
              cls={cls}
            />
          );
        })}
      </ul>
    );
  }
}

CategoriesList.propTypes = {};

export default CategoriesList;
