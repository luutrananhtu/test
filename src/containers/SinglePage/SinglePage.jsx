import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./SinglePage.css";
import Product from "../../components/Home/Product/Product";
import productApi from "../../Api/productApi";
import { Link } from "react-router-dom";
import { ActionType } from "../../Actions/index";
import { actionAddToCart } from "../../Actions/index";

class SinglePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      thumbnails: [],
      count: 1,
      focusImg: ""
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const productId = match.params.productId;

    const data = await productApi.getById(productId);

    const { body: product } = data;
    const thumbnails = [...product.thumbnails];
    this.setState({
      product,
      thumbnails,
      focusImg: product.image
    });
  }

  handleMinusClick = () => {
    if (this.state.count === 1) {
      return;
    } else {
      this.setState({ count: this.state.count - 1 });
    }
  };

  handlePlusClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleImageClick = imgUrl => {
    this.setState({ focusImg: imgUrl });
  };

  render() {
    const { product, thumbnails } = this.state;

    return (
      <div className="container single_product_container">
        <div className="row">
          <div className="col">
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    Men's
                  </Link>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    Single Product
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-7">
              <div className="single_product_pics">
                <div className="row">
                  <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                    <div className="single_product_thumbnails">
                      <ul>
                        {thumbnails.map(imgUrl => {
                          return (
                            <li
                              key={imgUrl}
                              onClick={() => this.handleImageClick(imgUrl)}
                            >
                              <img src={imgUrl} />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-9 image_col order-lg-2 order-1">
                    <div className="single_product_image">
                      <div
                        className="single_product_image_background"
                        style={{
                          backgroundImage: `url(${this.state.focusImg})`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="product_details">
                <div className="product_details_title">
                  <h2>{product.name}</h2>
                  <p>
                    Nam tempus turpis at metus scelerisque placerat nulla
                    deumantos solicitud felis. Pellentesque diam dolor,
                    elementum etos lobortis des mollis ut...
                  </p>
                </div>
                <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                  <span className="ti-truck" />
                  <span>free delivery</span>
                </div>
                <div className="original_price">{product.originalPrice}</div>
                <div className="product_price">{product.salePrice}</div>
                <ul className="star_rating">
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" aria-hidden="true" />
                  </li>
                </ul>
                <div className="product_color">
                  <span>Select Color:</span>
                  <ul>
                    <li style={{ background: "#e54e5d" }} />
                    <li style={{ background: "#252525" }} />
                    <li style={{ background: "#60b3f3" }} />
                  </ul>
                </div>
                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                  <span>Quantity:</span>
                  <div className="quantity_selector">
                    <span
                      className="minus"
                      onClick={e => {
                        console.log("test");
                        return this.handleMinusClick();
                      }}
                    >
                      <i className="fa fa-minus" aria-hidden="true" />
                    </span>
                    <span id="quantity_value">{this.state.count}</span>
                    <span
                      className="plus"
                      onClick={e => this.handlePlusClick()}
                    >
                      <i className="fa fa-plus" aria-hidden="true" />
                    </span>
                  </div>
                  <div
                    className="red add_to_cart"
                    onClick={() =>
                      this.props.addProductToCart(
                        this.state.product,
                        this.state.count
                      )
                    }
                  >
                    add to cart
                  </div>
                  <div className="product_favorite d-flex flex-column align-items-center justify-content-center" />
                </div>
              </div>
            </div>
          </div>

          <div className="tabs_section_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="tabs_container">
                    <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
                      <li className="tab active" data-active-tab="tab_1">
                        <span>Description</span>
                      </li>
                      <li className="tab" data-active-tab="tab_2">
                        <span>Additional Information</span>
                      </li>
                      <li className="tab" data-active-tab="tab_3">
                        <span>Reviews (2)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div id="tab_1" className="tab_container active">
                    <div className="row">
                      <div className="col-lg-5 desc_col">
                        <div className="tab_title">
                          <h4>Description</h4>
                        </div>
                        <div className="tab_text_block">
                          <h2>Pocket cotton sweatshirt</h2>
                          <p>
                            Nam tempus turpis at metus scelerisque placerat
                            nulla deumantos solicitud felis. Pellentesque diam
                            dolor, elementum etos lobortis des mollis ut...
                          </p>
                        </div>
                        <div className="tab_image">
                          <img src="images/desc_1.jpg" alt="" />
                        </div>
                        <div className="tab_text_block">
                          <h2>Pocket cotton sweatshirt</h2>
                          <p>
                            Nam tempus turpis at metus scelerisque placerat
                            nulla deumantos solicitud felis. Pellentesque diam
                            dolor, elementum etos lobortis des mollis ut...
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-5 offset-lg-2 desc_col">
                        <div className="tab_image">
                          <img src="images/desc_2.jpg" alt="" />
                        </div>
                        <div className="tab_text_block">
                          <h2>Pocket cotton sweatshirt</h2>
                          <p>
                            Nam tempus turpis at metus scelerisque placerat
                            nulla deumantos solicitud felis. Pellentesque diam
                            dolor, elementum etos lobortis des mollis ut...
                          </p>
                        </div>
                        <div className="tab_image desc_last">
                          <img src="images/desc_3.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="tab_2" className="tab_container">
                    <div className="row">
                      <div className="col additional_info_col">
                        <div className="tab_title additional_info_title">
                          <h4>Additional Information</h4>
                        </div>
                        <p>
                          COLOR:<span>Gold, Red</span>
                        </p>
                        <p>
                          SIZE:<span>L,M,XL</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div id="tab_3" className="tab_container">
                    <div className="row">
                      <div className="col-lg-6 reviews_col">
                        <div className="tab_title reviews_title">
                          <h4>Reviews (2)</h4>
                        </div>

                        <div className="user_review_container d-flex flex-column flex-sm-row">
                          <div className="user">
                            <div className="user_pic" />
                            <div className="user_rating">
                              <ul className="star_rating">
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star-o"
                                    aria-hidden="true"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="review">
                            <div className="review_date">27 Aug 2016</div>
                            <div className="user_name">Brandon William</div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua.
                            </p>
                          </div>
                        </div>

                        <div className="user_review_container d-flex flex-column flex-sm-row">
                          <div className="user">
                            <div className="user_pic" />
                            <div className="user_rating">
                              <ul className="star_rating">
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star-o"
                                    aria-hidden="true"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="review">
                            <div className="review_date">27 Aug 2016</div>
                            <div className="user_name">Brandon William</div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 add_review_col">
                        <div className="add_review">
                          <form id="review_form" action="post">
                            <div>
                              <h1>Add Review</h1>
                              <input
                                id="review_name"
                                className="form_input input_name"
                                type="text"
                                name="name"
                                placeholder="Name*"
                                required="required"
                                data-error="Name is required."
                              />
                              <input
                                id="review_email"
                                className="form_input input_email"
                                type="email"
                                name="email"
                                placeholder="Email*"
                                required="required"
                                data-error="Valid email is required."
                              />
                            </div>
                            <div>
                              <h1>Your Rating:</h1>
                              <ul className="user_star_rating">
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  />
                                </li>
                                <li>
                                  <i
                                    className="fa fa-star-o"
                                    aria-hidden="true"
                                  />
                                </li>
                              </ul>
                              <textarea
                                id="review_message"
                                className="input_review"
                                name="message"
                                placeholder="Your Review"
                                rows="4"
                                required
                                data-error="Please, leave us a review."
                              />
                            </div>
                            <div className="text-left text-sm-right">
                              <button
                                id="review_submit"
                                type="submit"
                                className="red_button review_submit_btn trans_300"
                                value="Submit"
                              >
                                submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
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

SinglePage.propTypes = {};

const mapDispatchToProps = dispatch => ({
  addProductToCart: (product, quantity) =>
    dispatch(actionAddToCart(product, quantity))
});

export default connect(
  null,
  mapDispatchToProps
)(SinglePage);
