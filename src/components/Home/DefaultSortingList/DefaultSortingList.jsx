import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import DefaultSortingItem from "../DefaultSortingItem/DefaultSortingItem";

class DefaultSortingList extends PureComponent {
  render() {
    const { onDefaultSortingItemClick, sortType } = this.props;
    const sortArray = Object.keys(sortType);
    // console.log(sortArray);
    return (
      <div>
        <ul className="sorting_type">
          {sortArray.map(sortItem => (
            <li
              className="type_sorting_btn"
              onClick={() => onDefaultSortingItemClick(sortItem)}
            >
              {sortType[sortItem]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

DefaultSortingList.propTypes = {};

export default DefaultSortingList;
