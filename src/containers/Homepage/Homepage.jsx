import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';
import DealOfTheWeek from '../../components/Home/DealOfTheWeek/DealOfTheWeek';
import HeroBanner from '../../components/Home/HeroBanner/HeroBanner';
import NewArrival from '../../components/Home/NewArrival/NewArrival';
import QuickCategories from '../../components/Home/QuickCategories/QuickCategories';
import ShippingInformation from '../../components/Home/ShippingInformation/ShippingInformation';
import productApi from '../../Api/productApi';
import { stringify } from 'query-string';

class Homepage extends PureComponent {
    async componentDidMount() {
        console.log('HomePage: componentDidMount');

        try {

            const filter = {
                limit: 8,
                skip: 0,
                order: 'name desc',
                where: {
                    categoryId: '5b822e7f9c300309b7e9befc',
                }
            };

            const params = {
                filter: JSON.stringify({ filter }),
                page: 1,
            };

            const productList = await productApi.getAll(params);
            console.log('Product List :', productList);

        } catch (e) {
            console.log('Failed to fetch post list: ', e.message);
        }
    }
    render() {

        return (
            <div>
                <HeroBanner />
                <QuickCategories />
                <NewArrival />
                <DealOfTheWeek />
                <ShippingInformation />
                <Footer />
            </div>
        );
    }
}

Homepage.propTypes = {

};

export default Homepage;