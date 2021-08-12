import React from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import AboutUs from './AboutUs'
import Sell from './Sell';
import ContactUs from './ContactUs'
import ProductPage from './ProductPage';
// import BackgroundImage from './BackgroundImage';
import LoginPage from './LoginPage';
import Profile from './EditProfile';
import CategoryPage from './CategoryPage';

function Body(props) {
    console.log(props);

    if (props.Auth) {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about-us">
                    <AboutUs />
                </Route>
                <Route exact path="/sell">
                    <Sell />
                </Route>
                <Route exact path="/contact-us">
                    <ContactUs />
                </Route>
                <Route exact path="/category">
                    <CategoryPage />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/item/:_id">
                    <ProductPage />
                </Route>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about-us">
                    <AboutUs />
                </Route>
                <Route exact path="/sell" >
                    <LoginPage />
                </Route>
                <Route exact path="/contact-us">
                    <ContactUs />
                </Route>
                <Route exact path="/category">
                    <CategoryPage />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route  exact path="/item/:_id">
                    <ProductPage />
                </Route>
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Authorised
    }
};

export default connect(mapStateToProps)(Body);