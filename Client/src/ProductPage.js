import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Combined.css';
import {connect} from 'react-redux';

// import ProductImage from './ProductPageSections/ProductImage';
// import ProductInfo from './ProductPageSections/ProductInfo.js';
import axios from 'axios';

class ProductPage extends Component {

  state = {
    _id: '',
    title: '',
    description: '',
    date: '',
    price: '',
    userName: '',
    images: '',
    userEmail: ''
  }
  componentDidMount() {
    axios.get('/api/items/' + this.props.id)
      .then(res => {
        const { data } = res;
        console.log(data);
        this.setState({
          data
        })
      })
  }
  render() {
    const { title,description,price,userName,userEmail,date } = this.state;
    return (
      <div>
        <div>
          <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
            <div className="my-3 py-3">
              <p className="display-5 customProductPagTitle">{title}</p>
            </div>
            <div className="bg-light box-shadow mx-auto" style={{ width: "85%", height: "100%", borderRadius: "21px 21px 0 0" }}>
              <div style={{ color: "black" }} >
                <div className="d-sm-flex flex-column justify-content-around">
                  <br /><br />
                  <div className="productcrousel d-flex justify-content-center">
                    <img src="https://source.unsplash.com/500x500/?football" className="ProductImage" />
                  </div >
                  <br /><br />
                  <div className="p-2"><b><u>Price:</u></b> Rs {price}</div>
                  <br />
                  {/* <div className="p-2"><b><u>Category:</u></b>  {category}</div>
                  <br /> */}
                  <div className="p-2"><u><b>Description</b></u></div>
                  <div>{description}</div>
                  <br /><br />
                </div>
                <div>
                  {/* <button className="col-md-7  customBuyButton" id="BuyButtonId" onClick={this.handleBuyClick} >Buy</button> */}
                  <br /><br />
                  <button className="col-md-7  customBuyButton" id="customWishlist" >Add to Wishlist</button>
                  <br /><br /><br /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    id: state._id
  }
}

export default connect(mapStateToProps, null)(ProductPage);