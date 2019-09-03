import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

class ProductImg extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      thumbnails: []
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    const productId = match.params.productId;

    const data = await productApi.getById(productId);

    const { body: product } = data;
    const thumbnails = [...product.thumnails]
    this.setState({
      product,
      thumbnails
    })
  }

  render() {
    console.log(this.state.thumbnails);
    return (
      <div>
        <div className="row">
          <div className="col-lg-7">
            <div className="single_product_pics">
              <div className="row">
                <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                  <div className="single_product_thumbnails">
                    <ul>
                      {
                        thumbnails.map(i => {
                          return <li><img src={i} alt="" /></li>
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductImg.propTypes = {

};

export default ProductImg;