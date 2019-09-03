import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';

class SortingItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { sortingItem, onChangeSort } = this.props;

    return (
      <div>
        <li onClick={() => onChangeSort(sortingItem)}>{sortingItem.title}</li>
      </div>
    );
  }
}

SortingItem.propTypes = {};

export default SortingItem;
