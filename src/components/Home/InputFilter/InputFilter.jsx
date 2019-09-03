import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import InputRange from "react-input-range";

class InputFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        min: this.props.minPrice,
        max: this.props.maxPrice
      }
    };
  }

  render() {
    const { changePrice, onFilterClick } = this.props;
    const { value } = this.state;
    return (
      <>
        <InputRange
          maxValue={800}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />

        <div id="slider-range" />
        <div
          className="filter_button"
          onClick={e => onFilterClick(value.min, value.max)}
        >
          <span
            onClick={() =>
              changePrice(this.state.value.min, this.state.value.max)
            }
          >
            filter
          </span>
        </div>
      </>
    );
  }
}

InputFilter.propTypes = {};

export default InputFilter;
