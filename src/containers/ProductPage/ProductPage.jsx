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
    const urlParams = new URLSearchParams(this.props.location.search);
    const initPage = Number(urlParams.get("page"));
    const initShow = Number(urlParams.get("show"));
    const initSort = urlParams.get("sort");
    const initFromPrice = Number(urlParams.get("fromPrice"));
    const initToPrice = Number(urlParams.get("toPrice"));
    const initCategories = urlParams.get("categories");

    this.state = {
      categories: [],
      totalProduct: 0,
      currentFilter: {
        currentCategories: initCategories ? initCategories : "",
        sortBy: initSort ? initSort : "default",
        productOnPage: initShow ? initShow : 6,
        currentPage: initPage ? initPage : 1,
        minPrice: initFromPrice ? initFromPrice : 300,
        maxPrice: initToPrice ? initToPrice : 700
      },
      productList: []
    };
    console.log(this.state);
  }
  getProductList = async productFilter => {
    const {
      currentCategories,
      sortBy,
      productOnPage,
      currentPage,
      minPrice,
      maxPrice
    } = productFilter;

    let filter = {
      limit: productOnPage,
      skip: productOnPage * (currentPage - 1),
      order: `${sortBy === "default" ? "" : sortBy}`,
      where: {
        salePrice: {
          between: [minPrice, maxPrice]
        }
      }
    };
    // If currentCategories is undefined - get all product
    // otherwise, get product by provided category.
    if (!!currentCategories && currentCategories !== "all") {
      filter = {
        ...filter,
        where: {
          ...filter.where,
          categoryId: currentCategories
        }
      };
    }

    const params = {
      filter: JSON.stringify(filter)
    };

    console.log(filter);
    const response = await productApi.getAll(params);
    const { body: productList } = response;
    const totalProduct = response.pagination.total;
    console.log(response);
    this.setState({
      productList,
      totalProduct
    });
  };

  componentDidMount = async () => {
    try {
      await this.getProductList(this.state.currentFilter);

      const categoriesList = await categoriesApi.getAll();
      const { body: categories } = categoriesList;
      categories.push({
        id: "all",
        name: "All"
      });
      this.setState({ categories });
      console.log(categories);
    } catch (error) {
      throw error;
    }
  };

  makeParamsURL = filter => {
    return `/product?categories=${filter.currentCategories}&show=${filter.productOnPage}&page=${filter.currentPage}&sort=${filter.sortBy}&fromPrice=${filter.minPrice}&toPrice=${filter.maxPrice}`;
  };

  handleCategoryClick = categories => {
    let newState = {
      ...this.state,
      currentFilter: {
        ...this.state.currentFilter,
        currentCategories: categories,
        currentPage: 1
      }
    };

    this.setState(newState);
    this.getProductList(newState.currentFilter);
    this.props.history.push(this.makeParamsURL(newState.currentFilter));
  };

  handleChangeSortClick = sort => {
    let newState = {
      ...this.state,
      currentFilter: {
        ...this.state.currentFilter,
        sortBy: sort
      }
    };
    console.log(newState);
    this.setState(newState);
    this.getProductList(newState.currentFilter);
    this.props.history.push(this.makeParamsURL(newState.currentFilter));
  };

  handleShowProductClick = numProduct => {
    let newState = {
      ...this.state,
      currentFilter: {
        ...this.state.currentFilter,
        productOnPage: numProduct,
        currentPage: 1
      }
    };
    console.log(newState);
    this.setState(newState);
    this.getProductList(newState.currentFilter);
    this.props.history.push(this.makeParamsURL(newState.currentFilter));
  };

  handleFilterClick = async (min, max) => {
    let newState = {
      ...this.state,
      currentFilter: {
        ...this.state.currentFilter,
        minPrice: min,
        maxPrice: max
      }
    };
    // console.log(newState);
    this.setState(newState);
    this.getProductList(newState.currentFilter);
    this.props.history.push(this.makeParamsURL(newState.currentFilter));
  };

  handlePaginationClick = async page => {
    let newState = {
      ...this.state,
      currentFilter: {
        ...this.state.currentFilter,
        currentPage: page
      }
    };
    // console.log(newState);
    this.setState(newState);
    this.getProductList(newState.currentFilter);
    this.props.history.push(this.makeParamsURL(newState.currentFilter));
  };

  render() {
    const { currentFilter, totalProduct } = this.state;
    const sortingDefault = {
      default: "Default Sorting",
      salePrice: "Product Price",
      name: "Product Name"
    };
    console.log(this.state);
    const totalPage = Math.ceil(totalProduct / currentFilter.productOnPage);
    const pageArray = Array.from(Array(totalPage).keys());

    // console.log(pageArray);
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
              currentFilter={this.state.currentFilter}
            />

            <div className="main_content">
              <div className="products_iso">
                <div className="row">
                  <div className="col">
                    <div className="product_sorting_container product_sorting_container_top">
                      <ul className="product_sorting">
                        <li>
                          <span className="type_sorting_text">
                            {sortingDefault[this.state.currentFilter.sortBy]}
                          </span>
                          <i className="fa fa-angle-down" />
                          {/* <ul className="sorting_type"> */}
                          <DefaultSortingList
                            onDefaultSortingItemClick={
                              this.handleChangeSortClick
                            }
                            sortingList={sortingDefault}
                          />
                          {/* <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "original-order" }'><span>Default Sorting</span></li>
                            <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "price" }'><span>Price</span></li>
                            <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "name" }'><span>Product Name</span></li> */}
                          {/* </ul> */}
                        </li>
                        <li>
                          <span>Show</span>
                          <span className="num_sorting_text">
                            {this.state.currentFilter.productOnPage}
                          </span>
                          <i className="fa fa-angle-down" />
                          <SortingList
                            onSortingItemClick={this.handleShowProductClick}
                          />
                        </li>
                      </ul>
                      <div className="pages d-flex flex-row align-items-center">
                        <div className="page_current">
                          <span>{currentFilter.currentPage}</span>
                          <ul className="page_selection">
                            {pageArray.map(page => (
                              <li
                                key={page + 1}
                                onClick={() =>
                                  this.handlePaginationClick(page + 1)
                                }
                              >
                                <span>{page + 1}</span>
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
                          <span>of</span> {totalPage}
                        </div>
                        <div
                          id="next_page"
                          className="page_next"
                          onClick={() =>
                            this.handlePaginationClick(
                              currentFilter.currentPage >= totalPage
                                ? currentFilter.currentPage
                                : currentFilter.currentPage + 1
                            )
                          }
                        >
                          <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="product-grid">
                      {this.state.productList.length === 0 && (
                        <div className="loadingImg">
                          <img
                            src="https://loading.io/spinners/cutiefox/index.cutie-fox-spinner.svg"
                            alt=""
                          />
                        </div>
                      )}
                      <ProductList productList={this.state.productList} />
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
                            {pageArray.map(page => (
                              <li
                                key={page + 1}
                                onClick={() =>
                                  this.handlePaginationClick(page + 1)
                                }
                              >
                                <span>{page + 1}</span>
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
                            {pageArray.map(page => (
                              <li
                                key={page + 1}
                                onClick={() =>
                                  this.handlePaginationClick(page + 1)
                                }
                              >
                                <span>{page + 1}</span>
                              </li>
                            ))}

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
                          <span>of</span> {totalPage}
                        </div>
                        <div
                          id="next_page_1"
                          className="page_next"
                          onClick={() =>
                            this.handlePaginationClick(
                              currentFilter.currentPage >= totalPage
                                ? currentFilter.currentPage
                                : currentFilter.currentPage + 1
                            )
                          }
                        >
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
