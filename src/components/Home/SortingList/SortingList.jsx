import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import SortingItem from "../SortingItem/SortingItem";

class SortingList extends PureComponent {
  render() {
    const { onSortingItemClick } = this.props;
    const sortingArray = [6, 12, 24];
    return (
      <ul className="sorting_num">
        {sortingArray.map((sortItem, sortingNumber) => (
          <li key={sortingNumber} onClick={() => onSortingItemClick(sortItem)}>
            {sortItem}
          </li>
        ))}
      </ul>
    );
  }
}

SortingList.propTypes = {};

export default SortingList;
