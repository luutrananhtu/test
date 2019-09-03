import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import SortingItem from "../SortingItem/SortingItem";

class SortingList extends PureComponent {
  render() {
    const { onSortingItemClick, currentProductNumber } = this.props;

    return (
      <div>
        <ul className="sorting_num">
          {" "}
          {this.props.sortingList.map(s => {
            return (
              <SortingItem
                onChangeSort={onSortingItemClick}
                sortingItem={s}
                currentProductNumber={currentProductNumber}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

SortingList.propTypes = {};

export default SortingList;
