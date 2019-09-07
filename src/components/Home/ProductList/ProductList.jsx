import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import Product from "../Product/Product";

class ProductList extends PureComponent {
  render() {
    const { productList } = this.props;
    return (
      <div className="row">
        {productList.map((p, idx) => {
          return <Product key={idx} product={p} />;
        })}
      </div>
    );
  }
}

ProductList.propTypes = {};

export default ProductList;
