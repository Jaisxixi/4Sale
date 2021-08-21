import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Combined.css';
import { withRouter } from 'react-router';
import axios from 'axios';
import WishList from './components/WishList';
import { connect } from 'react-redux';

function ImageCarousel(props) {
  let items = []
  function image(i, _id) {
    if (i === 1) {
      return (
        <div key={i} className=" active carousel-item customCarousel">
          <img src={`/uploads/${_id}-${i}`} alt="" className="ProductImage" />
        </div>
      )
    } else {
      return (
        <div key={i} className=" carousel-item customCarousel">
          <img src={`/uploads/${_id}-${i}`} alt="" className="ProductImage" />
        </div>
      )
    }
  }
  for (var i = 1; i <= props.images; i++) {
    items.push(
      image(i, props._id)
    )
  }
  return (items)
};

//MAIN FUNCTION
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
    const { id } = this.props
    axios.get('/api/items/' + id)
      .then(res => {
        const { data } = res;
        this.setState({
          ...data
        })
      })
  }

  render() {
    const { user } = this.props;
    const { _id, title, description, price, userName, userEmail, date, images } = this.state;
    let date1 = date.slice(0, 10);
    const yr = date1.slice(0, 4);
    const mnth = date1.slice(5, 7);
    const dte = date1.slice(8, 10);

    const handleBuy = () => {
      if (this.props.auth) {
        axios.put(`/api/items/notify/${_id}`, {
          notification: {
            message: `wants to buy ${title}`,
            userName: user.name,
            userEmail: user.email,
            mobile: user.mobile
          }
        })
          .then(res => {
            alert(res.data);
          })
      }
      else {
        alert("Please Login ");
      }
    }

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
                  <div id="myCarousel" className="container-fluid carousel slide crousalCustomEdit" data-bs-ride="carousel">
                    <div className="carousel-inner crousalCustomEdit">
                      <ImageCarousel _id={_id} images={images} />
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <br /><br />
                  <div className="p-2"><b><u>Price:</u></b> Rs {price}</div>
                  <br />
                  <div className="p-2"><u><b>Uploaded On</b></u></div>
                  <div>{dte + '-' + mnth + '-' + yr}</div>
                  <div className="p-2"><u><b>Description</b></u></div>
                  <div>{description}</div>
                  <div className="p-2"><u><b>Uploaded By</b></u></div>
                  <div>{userName}</div>
                  <div>{userEmail}</div>
                  <br /><br />
                </div>
                <div>
                  <button onClick={handleBuy} className="col-md-7 customBuyButton" id="BuyButtonId"  >Buy</button>
                  <WishList _id={_id} id="FavButton" />
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
    user: state.user,
    auth: state.Authorised
  }
}

export default withRouter(connect(mapStateToProps)(ProductPage));