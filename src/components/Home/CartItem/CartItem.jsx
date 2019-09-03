import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import "./CartItem.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actionAddToCart,
  removeItem,
  subtractToCart
} from "../../../Actions/index";

class CartItem extends PureComponent {
  render() {
    const { cartItem, actionAddToCart, actionSubtractToCart } = this.props;
    console.log("object", 11111, cartItem);
    return (
      <tr>
        <th scope="row">
          <img
            src={cartItem.product.image}
            alt=""
            className="img-fluid z-depth-0"
          />
        </th>
        <td>
          <h5>
            <strong>{cartItem.product.name}</strong>
          </h5>
        </td>
        <td>{cartItem.product.salePrice}</td>
        <td className="center-on-small-only">
          <div className="btn-group radio-group" data-toggle="buttons">
            <label
              onClick={e =>
                this.props.actionSubtractToCart(cartItem.product, 1)
              }
              className="btn btn-sm btn-primary
                  btn-rounded waves-effect waves-light"
            >
              <a>—</a>
            </label>
            <label
              onClick={e => this.props.actionAddToCart(cartItem.product, 1)}
              className="btn btn-sm btn-primary
                  btn-rounded waves-effect waves-light"
            >
              <a>+</a>
            </label>
          </div>
          <span className="qty">{cartItem.quantity}</span>
        </td>
        <td>{cartItem.product.salePrice * cartItem.quantity}$</td>
        <td>
          <button
            type="button"
            className="btn btn-sm btn-primary waves-effect waves-light"
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="Remove item"
            onClick={e => this.props.onRemoveItem(cartItem.product, -1)}
          >
            X
          </button>
        </td>
      </tr>
    );
  }
}

CartItem.propTypes = {};

const mapDispatchToProps = dispatch => ({
  actionAddToCart: product => dispatch(actionAddToCart(product, 1)),
  actionSubtractToCart: product => dispatch(subtractToCart(product, 1)),
  onRemoveItem: product => dispatch(removeItem(product))
});

export default connect(
  null,
  mapDispatchToProps
)(CartItem);
