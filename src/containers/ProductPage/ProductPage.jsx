import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import "./ProductPage.css";
import ProductList from "../../components/Home/ProductList/ProductList";
import { Link } from "react-router-dom";
import axios from "axios";
import categoriesApi from "../../Api/categoriesApi";
import productApi from "../../Api/productApi";
// import CategoriesList from "../../components/Home/CategoriesList/CategoriesList";
import SortingList from "../../components/Home/SortingList/SortingList";
// import { privateEncrypt } from "crypto";
import DefaultSortingList from "../../components/Home/DefaultSortingList/DefaultSortingList";
import SideBar from "../../components/Home/SideBar/SideBar";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      sortingList: [
        {
          title: 6,
          id: 0
        },
        {
          title: 12,
          id: 0
        },
        {
          title: 24,
          id: 0
        }
      ],
      sortItemTitle: 6,

      totalProduct: 0,

      currentFilter: {
        productPerPage: 6,
        currentPage: 1,
        defaultSorting: "default",
        minPrice: 0,
        maxPrice: 800
      },
      pageArray: [],
      totalPage: 0
    };
  }
  getProduct = () => {
    let filter = {
      limit: this.state.currentFilter.productPerPage,
      skip:
        (this.state.currentFilter.currentPage - 1) *
        this.state.currentFilter.productPerPage,
      order:
        this.state.currentFilter.defaultSorting === "default"
          ? ""
          : this.state.currentFilter.defaultSorting,
      where: {
        categoryId: this.state.currentFilter.currentCategories,
        salePrice: {
          between: [
            this.state.currentFilter.minPrice,
            this.state.currentFilter.maxPrice
          ]
        }
      }
    };
    if (
      filter.where.categoryId === "all" ||
      filter.where.categoryId === undefined
    ) {
      delete filter.where.categoryId;
    }
    const params = {
      filter: JSON.stringify(filter)
    };

    return productApi
      .getAll(params)
      .then(newProduct => {
        const { body: products } = newProduct;
        const totalProduct = newProduct.pagination.total;
        const totalPage = Math.ceil(totalProduct / newProduct.pagination.limit);
        const pageArray = Array.from({ length: totalPage });
        this.setState({
          products,
          totalProduct,
          totalPage,
          pageArray
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = async () => {
    this.getProduct();
  };

  handleCategoryClick = categories => {};

  handleSortClick = ({ title }) => {
    this.setState({
      sortItemTitle: title,
      currentFilter: {
        ...this.state.currentFilter,
        productPerPage: title,
        currentPage: 1,
        defaultSorting: "default",
        minPrice: 0,
        maxPrice: 800
      }
    });
  };

  handleDefaultClick = sortBy => {};

  handleFilterClick = async (min, max) => {};

  handlePaginationClick = async currPage => {};

  render() {
    const { sortingList, currentFilter, totalProduct } = this.state;
    const { defaultSortingItem } = this.state;
    const sortType = {
      default: "Default Sorting",
      salePrice: "Price",
      name: "Product Name"
    };

    return (
      <div className="container product_section_container">
        <div className="row">
          <div className="col product_section clearfix">
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active">
                  <Link to="/">
                    <i className="fa fa-angle-right" aria-hidden="true" />
                    Men's
                  </Link>
                </li>
              </ul>
            </div>

            <SideBar
              handleCategoryClick={this.handleCategoryClick}
              categories={this.state.categories}
              onFilterClick={this.handleFilterClick}
            />

            <div className="main_content">
              <div className="products_iso">
                <div className="row">
                  <div className="col">
                    <div className="product_sorting_container product_sorting_container_top">
                      <ul className="product_sorting">
                        <li>
                          <span className="type_sorting_text">
                            {sortType[currentFilter.defaultSorting]}
                          </span>
                          <i className="fa fa-angle-down" />
                          {/* <ul className="sorting_type"> */}
                          <DefaultSortingList
                            onDefaultSortingItemClick={() => {
                              this.handleDefaultClick();
                            }}
                            defaultSortingList={defaultSortingItem}
                            sortType={sortType}
                          />
                          {/* <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "original-order" }'><span>Default Sorting</span></li>
                            <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "price" }'><span>Price</span></li>
                            <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "name" }'><span>Product Name</span></li> */}
                          {/* </ul> */}
                        </li>
                        <li>
                          <span>Show</span>
                          <span className="num_sorting_text">
                            {this.state.sortItemTitle}
                          </span>
                          <i className="fa fa-angle-down" />
                          <SortingList
                            onSortingItemClick={this.handleSortClick}
                            sortingList={sortingList}
                          />
                        </li>
                      </ul>
                      <div className="pages d-flex flex-row align-items-center">
                        <div className="page_current">
                          <span>{currentFilter.currentPage}</span>
                          <ul className="page_selection">
                            {this.state.pageArray.map((_, idx) => (
                              <li
                                key={idx}
                                onClick={() =>
                                  this.handlePaginationClick(idx + 1)
                                }
                              >
                                <span>{idx + 1}</span>
                              </li>
                            ))}
                            {/* <li onClick={() => this.handlePaginationClick(1)}>
                              <span>1</span>
                            </li>
                            <li onClick={() => this.handlePaginationClick(2)}>
                              <span>2</span>
                            </li>
                            <li onClick={() => this.handlePaginationClick(3)}>
                              <span>3</span>
                            </li> */}
                          </ul>
                        </div>
                        <div className="page_total">
                          <span>of</span> {this.state.totalPage}
                        </div>
                        <div
                          id="next_page"
                          className="page_next"
                          onClick={() => this.handlePaginationClick()}
                        >
                          <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="product-grid">
                      <ProductList productList={this.state.products} />
                    </div>

                    <div className="product_sorting_container product_sorting_container_bottom clearfix">
                      <ul className="product_sorting">
                        <li>
                          <span>Show:</span>
                          <span className="num_sorting_text">
                            {currentFilter.currentPage}
                          </span>
                          <i className="fa fa-angle-down" />
                          <ul className="sorting_num">
                            {this.state.pageArray.map((_, idx) => (
                              <li
                                key={idx}
                                onClick={() =>
                                  this.handlePaginationClick(idx + 1)
                                }
                              >
                                <span>{idx + 1}</span>
                              </li>
                            ))}
                            {/* <li className="num_sorting_btn">
                              <span>01</span>
                            </li>
                            <li className="num_sorting_btn">
                              <span>02</span>
                            </li>
                            <li className="num_sorting_btn">
                              <span>03</span>
                            </li>
                            <li className="num_sorting_btn">
                              <span>04</span>
                            </li> */}
                          </ul>
                        </li>
                      </ul>
                      <span className="showing_results">
                        Showing 1–3 of 12 results
                      </span>
                      <div className="pages d-flex flex-row align-items-center">
                        <div className="page_current">
                          <span>{currentFilter.currentPage}</span>
                          <ul className="page_selection">
                            {this.state.pageArray.map((_, idx) => {
                              // console.log(idx);
                              return (
                                <li
                                  key={idx}
                                  style={{ color: "black" }}
                                  onClick={() =>
                                    this.handlePaginationClick(idx + 1)
                                  }
                                >
                                  <span style={{ color: "black" }}>
                                    {idx + 1}
                                  </span>
                                </li>
                              );
                            })}

                            {/* <li onClick={() => this.handlePaginationClick(1)}>
                              <span>1</span>
                            </li>
                            <li onClick={() => this.handlePaginationClick(2)}>
                              <span>2</span>
                            </li>
                            <li onClick={() => this.handlePaginationClick(3)}>
                              <span>3</span> */}
                            {/* </li> */}
                          </ul>
                        </div>
                        <div className="page_total">
                          <span>of</span> {this.state.totalPage}
                        </div>
                        <div id="next_page_1" className="page_next">
                          <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                          />
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

ProductPage.propTypes = {};

export default ProductPage;
