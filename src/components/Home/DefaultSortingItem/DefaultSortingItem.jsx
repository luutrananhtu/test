import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

class DefaultSortingItem extends PureComponent {
  render() {
    const { defaultSortingItem, onClick } = this.props;

    return (
      <div>
        <li className="type_sorting_btn"
          onClick={e => onClick(defaultSortingItem)}>
          {defaultSortingItem.title}
        </li>
      </div>
    );
  }
}

DefaultSortingItem.propTypes = {

};

export default DefaultSortingItem;