import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Header.css";

class Header extends Component {
  countTotalProduct = () => {
    console.log(this.props.productList);
    return this.props.productList.reduce(
      (prev, curr) => prev + curr.quantity,
      0
    );
  };
  render() {
    console.log(this.props.productList);
    return (
      <div>
        <header className="header trans_300">
          <div className="top_nav">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="top_nav_left">
                    free shipping on all u.s orders over $50
                  </div>
                </div>
                <div className="col-md-6 text-right">
                  <div className="top_nav_right">
                    <ul className="top_nav_menu">
                      <li className="language">
                        <a href="#">
                          English
                          <i className="fa fa-angle-down" />
                        </a>
                        <ul className="language_selection">
                          <li>
                            <a href="#">French</a>
                          </li>
                          <li>
                            <a href="#">Italian</a>
                          </li>
                          <li>
                            <a href="#">German</a>
                          </li>
                          <li>
                            <a href="#">Spanish</a>
                          </li>
                        </ul>
                      </li>
                      <li className="account">
                        <a href="#">
                          My Account
                          <i className="fa fa-angle-down" />
                        </a>
                        <ul className="account_selection">
                          <li>
                            <a href="#">
                              <i className="fa fa-sign-in" aria-hidden="true" />
                              Sign In
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                className="fa fa-user-plus"
                                aria-hidden="true"
                              />
                              Register
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main_nav_container">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-right">
                  <div className="logo_container">
                    <a href="#">
                      Nordic<span>Shop</span>
                    </a>
                  </div>
                  <nav className="navbar">
                    <ul className="navbar_menu">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/product">Product</Link>
                      </li>
                      {/* <li><a href="#">home</a></li>
											<li><a href="categories.html">shop</a></li> */}
                      <li>
                        <Link to="/promotion">Promotion</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                    <ul className="navbar_user">
                      <li className="checkout">
                        <Link to="/shoppingcart">
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          />
                          <span id="checkout_items" className="checkout_items">
                            {this.countTotalProduct()}
                          </span>
                        </Link>
                      </li>
                    </ul>
                    <div className="hamburger_container">
                      <i className="fa fa-bars" aria-hidden="true" />
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

// Header.propTypes = {

// };

const mapStateToProps = state => ({
  productList: state.listCart
});

export default connect(mapStateToProps)(Header);
