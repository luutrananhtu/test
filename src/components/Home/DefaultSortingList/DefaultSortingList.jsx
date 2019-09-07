import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import DefaultSortingItem from "../DefaultSortingItem/DefaultSortingItem";

class DefaultSortingList extends PureComponent {
  render() {
    const { onDefaultSortingItemClick, sortingList } = this.props;
    const sortingArray = Object.keys(sortingList);
    // console.log(sortArray);
    return (
      <ul className="sorting_type">
        {sortingArray.map((sortItem, sortingType) => (
          <li
            key={sortingType}
            onClick={() => onDefaultSortingItemClick(sortItem)}
          >
            {sortingList[sortItem]}
          </li>
        ))}
      </ul>
    );
  }
}

DefaultSortingList.propTypes = {};

export default DefaultSortingList;
