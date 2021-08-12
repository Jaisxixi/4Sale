import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Combined.css';
import { connect } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';



class Sell extends Component {
    render() {
        
        //props track:
        console.log(this.props);

        function handleSubmit(e) {
            e.preventDefault();
            const formData = e.target;
            const newItem = new FormData(formData);
            
            newItem.append('userName', this.props.user.name);             //Edit User detsils to variables
            newItem.append('userEmail', this.props.user.email);

            axios.post('/api/items', newItem)
                .then(res => {
                    alert(`Posted Ad for ${res.data.title}`);
                    console.log(res.data)
                    axios.put(`/api/user/${this.props.user._id}`, {        //Edit user favs id to variable
                        sold: res.data._id
                    })
                    .then((res)=>{
                        console.log(res);
                    });
                })

        }

        return (
            <div>
                <div className="container-fluid ">
                    <main>
                        <div className="d-flex justify-content-center flex-column bd-highlight mb-3">

                            <br />

                            <div className="row featurette d-flex justify-content-center customHeaderSellPage">
                                <div className="col-md-7">
                                    <h2 className="featurette-heading">Want to share your belongings?<br /><br /><br /> Post an AD now !!</h2>
                                </div>
                                <div className="col-md-5 ">
                                    <img className=" img-fluid bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="https://source.unsplash.com/1600x900/?money,finance" alt="Displat Image SellPage"></img>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="row g-5  d-flex justify-content-center">

                                <div className="col-md-7 col-lg-8 bg-light ">
                                    <br />
                                    <h2 className="mb-3 "><u>Product Details</u></h2><br /><br />

                                    {/* FORM */}
                                    <form className="needs-validation" id="itemForm" noValidate="" onSubmit={handleSubmit} >
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label htmlFor="productTitle" className="form-label">Product Title</label>
                                                <input required type="text" className="form-control" id="productTitle" placeholder="Enter the product title here" required name="title" />
                                                <div className="invalid-feedback">
                                                    Please enter product title.
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Product Description</label>
                                                <div className="input-group has-validation">
                                                    <textarea required className="form-control" id="description" placeholder="Enter Product Description" required name="description" />
                                                    <div className="invalid-feedback">
                                                        Please enter product description.
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center flex-column bd-highlight mb-3">
                                                <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-4">
                                                    <label htmlFor="price" className="form-label" required>Price</label>
                                                    <input min="0" type="number" className="form-control" id="price" placeholder="Set a Price" required name="price" />

                                                    <div className="invalid-feedback">
                                                        Please enter product price.
                                                    </div>
                                                </div>


                                                <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-3">
                                                    <label className="form-label">Categories</label>
                                                    <div className="mb-3 form-check col-2">
                                                        <input type="checkbox" className="form-check-input" id="Sports" name="Sports" />
                                                        <label className="form-check-label" htmlFor="Sports">Sports</label>
                                                    </div>
                                                    <div className="mb-3 form-check col-2">
                                                        <input type="checkbox" className="form-check-input" id="Books" name="Books" />
                                                        <label className="form-check-label" htmlFor="Books">Books</label>
                                                    </div>
                                                    <div className="mb-3 form-check col-2">
                                                        <input type="checkbox" className="form-check-input" id="Games" name="Games" />
                                                        <label className="form-check-label" htmlFor="Games">Games</label>
                                                    </div>
                                                    <div className="mb-3 form-check col-2">
                                                        <input type="checkbox" className="form-check-input" id="Utilities" name="Utilities" />
                                                        <label className="form-check-label" htmlFor="Utilities">Utilities</label>
                                                    </div>

                                                    <div className="invalid-feedback">
                                                        Please enter product category.
                                                    </div>
                                                </div>

                                                <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-3">
                                                    <label htmlFor="image1" className="form-label">Upload Images</label>
                                                    <input type="file" className="form-control" id="image1" placeholder="Enter the category"  name="file1" />
                                                    <input type="file" className="form-control" id="image2" placeholder="Enter the category" name="file2" />
                                                    <input type="file" className="form-control" id="image3" placeholder="Enter the category" name="file3" />
                                                    <div className="invalid-feedback">
                                                        Please upload an image.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <hr className="my-4" />
                                        <div className="d-flex flex-column bd-highlight mb-3 justify-content-evenly ">
                                            <button className="w-100 btn btn-success btn-lg" type="submit" onClick={this.pushToHome}>Post Ad</button>
                                        </div>
                                        <button className="w-100 btn btn-primary btn-lg" style={{ textDecoration: 'none', color: 'white' }} type="reset">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>

                    <br />
                    <br />
                    <br />
                    <br />
                </div>


                <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>

                <script src="form-validation.js"></script>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Sell);