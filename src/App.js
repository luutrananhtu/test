import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Header from './components/Common/Header/Header'
import Homepage from './containers/Homepage/Homepage';
import ProductPage from './containers/ProductPage/ProductPage';
import store from './store'
import Footer from './components/Common/Footer/Footer';
import ShippingInformation from './components/Home/ShippingInformation/ShippingInformation';
import PromotionPage from './containers/PromotionPage/PromotionPage';
import BlogPage from './containers/BlogPage/BlogPage';
import ContactPage from './containers/ContactPage/ContactPage';
import SinglePage from './containers/SinglePage/SinglePage';
import CategoriesList from './components/Home/CategoriesList/CategoriesList';
import ShoppingCart from './containers/ShoppingCart/ShoppingCart';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/promotion" component={PromotionPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/shoppingcart" component={ShoppingCart} />
          <Route path="/categories/" component={CategoriesList} />
          <Route path="/single/:productId" component={SinglePage} />

        </Switch>
        <ShippingInformation />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
