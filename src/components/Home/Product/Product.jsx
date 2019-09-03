import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionAddToCart, removeItem } from "../../../Actions/index";
import { connect } from "react-redux";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {}
    };
  }

  handleClick = product => {
    const url = `/single/${product.id}`;
  };

  render() {
    // console.log(this.props);
    const { product } = this.props;
    return (
      <div className="product-item">
        <div className="product discount product_filter">
          <div className="product_image">
            <img src={product.image} alt="" />
          </div>
          <div className="favorite favorite_left" />
          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
            <span>-$20</span>
          </div>
          <div className="product_info">
            <h6 className="product_name">
              <NavLink to={`/single/${product.id}`}>{product.name}</NavLink>
            </h6>
            <div className="product_price">
              {product.salePrice}{" "}
              <span>
                <strike>{product.originalPrice}</strike>
              </span>
            </div>
          </div>
        </div>
        <div
          className="red_button add_to_cart_button"
          onClick={e => this.props.actionAddToCart(this.props.product)}
        >
          <a>add to cart</a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionAddToCart: product => dispatch(actionAddToCart(product, 1)),
  removeItem: product => dispatch(removeItem(product))
});

export default connect(
  null,
  mapDispatchToProps
)(Product);
