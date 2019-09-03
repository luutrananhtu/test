import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';

class Catergories extends PureComponent {
  render() {
    const { categories, onCategoriesClick, cls } = this.props;
    return (
      <li
        key={this.props.key}
        onClick={() => onCategoriesClick(categories)}
        className={cls}
      >
        <a> {categories.name} </a>
      </li>
    );
  }
}

Catergories.propTypes = {};

export default Catergories;
