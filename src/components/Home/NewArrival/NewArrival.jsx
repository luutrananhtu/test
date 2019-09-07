import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import "./NewArrival.css";
import "../ProductList/ProductList";
import ProductList from "../ProductList/ProductList";
import CategoriesList from "../CategoriesList/CategoriesList";
import axios from "axios";
import categoriesApi from "../../../Api/categoriesApi";
import { bindActionCreators } from "redux";
import productApi from "../../../Api/productApi";
import { connect } from "react-redux";
import { actionAddToCart } from "../../../Actions/index";

class NewArrival extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: []
    };
  }

  componentDidMount = async () => {
    try {
      await axios
        .get(`http://api.demo.nordiccoder.com/api/products`)
        .then(response => this.setState({ products: response.data.body }));
      const categoriesList = await categoriesApi.getAll();
      const { body: categories } = categoriesList;
      categories.push({
        id: "all",
        name: "ALL"
      });
      this.setState({ categories });
      console.log(categories);
    } catch (error) {
      throw error;
    }
  };

  handleCategoryClick = async category => {
    try {
      let filter = {
        limit: 10,
        skip: 0,
        where: {
          categoryId: category.id
        }
      };
      if (category.id === "all") {
        console.log(filter);
        delete filter.where.categoryId;
      } else {
        filter = {
          limit: 10,
          skip: 0,
          where: {
            categoryId: category.id
          }
        };
      }

      const params = {
        filter: JSON.stringify(filter)
      };

      const newProduct = await productApi.getAll(params);

      const { body: products } = newProduct;
      this.setState({ products });
      console.log(newProduct);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (
      this.state.products.length === 0 ||
      this.state.categories.length === 0
    ) {
      return (
        <div className="loadingImg">
          <img
            src="https://loading.io/spinners/cutiefox/index.cutie-fox-spinner.svg"
            alt=""
          />
        </div>
      );
    }
    return (
      <div className="new_arrivals">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>New Arrivals</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="new_arrivals_sorting">
                <CategoriesList
                  cls="
									grid_sorting_button 
									button d-flex flex-column 
									justify-content-center align-items-center active is-checked"
                  onCategoriesClick={this.handleCategoryClick}
                  categoriesList={this.state.categories}
                />
              </div>
            </div>
          </div>
          <ProductList productList={this.state.products} />
        </div>
      </div>
    );
  }
}

NewArrival.propTypes = {};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      actionAddToCart
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(NewArrival);
