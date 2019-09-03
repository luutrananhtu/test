import React, { PureComponent } from "react";
import "./ShoppingCart.css";
import CartItem from "../../components/Home/CartItem/CartItem";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { actionAddToCart, removeItem } from "../../Actions/index.js";

class ShoppingCart extends PureComponent {
  showTotal = () => {
    let rs = this.props.cartList.reduce((prev, curr) => {
      return prev + curr.product.salePrice * curr.quantity;
    }, 0);
    return rs;
  };

  onChange = (index, val) => {
    this.setState({
      products: this.state.products.map((product, i) =>
        i === index ? { ...product, count: val } : product
      )
    });
  };

  render() {
    const { cartList, onAddToCart, onRemoveItem } = this.props;
    return (
      <div style={{ marginTop: "200px" }}>
        <section className="section">
          <div className="table-responsive">
            <table className="table product-table">
              <thead>
                <tr>
                  <th />
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cartList.map(cartItem => (
                  <CartItem
                    cartItem={cartItem}
                    onAddToCart={onAddToCart}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
                <tr>
                  <td colSpan="3" />
                  <td>
                    <h4>
                      <strong>Total</strong>
                    </h4>
                  </td>
                  <td>
                    <h4>
                      <strong>{this.showTotal()} $</strong>
                    </h4>
                  </td>
                  <td colSpan="3">
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Complete purchase
                      <i className="fa fa-angle-right right" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

ShoppingCart.propTypes = {};

const mapStateToProps = state => ({
  cartList: state.listCart
});

const mapDispatchToProps = dispatch => ({
  actionAddToCart: product => dispatch(actionAddToCart(product, 1)),
  onRemoveItem: product => dispatch(removeItem(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
