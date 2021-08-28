import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Combined.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';



function Sell(props) {
    const { user } = props;
    const { history } = props;
    const { Update } = props;
    function handleSubmit(e) {
        e.preventDefault();
        const formData = e.target;
        const newItem = new FormData(formData);

        newItem.append('userName', user.name);
        newItem.append('userEmail', user.email);
        newItem.append('userID', user._id);

        axios.post('/api/items', newItem)
            .then(res => {
                alert(`Posted Ad for ${res.data.title}`);
                history.push('/');
                axios.put(`/api/user/sold/${user._id}`, {
                    sold: res.data._id
                })
                    .then((res) => {
                        const newUser = {
                            ...user,
                            soldItems: res.data.soldItems
                        }
                        Update(newUser);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })

    }
    if (props.AuthLoading) {
        return (
            <div className="loading">
                <h3>Loading...</h3>
            </div>
        )
    } else {
        return (
            <div>
                <div className="container-fluid ">
                    <main>

                        <div className='container-fluid d-flex justify-content-between mb-4 ' style={{
                            height: '30vw', backgroundColor: '#fff',
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/always-grey.png")'
                        }} >
                            <div className="d-flex flex-column" style={{ width: '55vw', padding: '20px 10px' }}>
                                <h1 className="" style={{ fontSize: '5vw', fontWeight: 'bold' }} >Want to share your belongings? </h1>
                                <p style={{ fontSize: '3vw' }} >Post an AD now.</p>
                            </div>
                            <img src="/sell.jpg" alt="" style={{ height: 'inherit' }} />
                        </div>




                        <div className="container px-1 ">
                            <hr />
                            <h2 className=" text-center "><u>Product Details</u></h2><br />

                            {/* FORM */}
                            <div className="d-flex flex-wrap justify-content-center">
                                <form className="needs-validation" id="itemForm" noValidate="" onSubmit={handleSubmit} >
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <label htmlFor="productTitle" className="form-label">Product Title</label>
                                            <input autoCapitalize="sentences" required type="text" className="form-control custom-form" id="productTitle" placeholder="Enter the product title here" name="title" />
                                            <div className="invalid-feedback">
                                                Please enter product title.
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="description" className="form-label">Product Description</label>
                                            <div className="input-group has-validation">
                                                <textarea autoCapitalize="sentences" required className="form-control custom-form" id="description" placeholder="Enter Product Description" name="description" />
                                                <div className="invalid-feedback">
                                                    Please enter product description.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center flex-column bd-highlight mb-3">
                                            <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-4">
                                                <label htmlFor="price" className="form-label" required>Price</label>
                                                <input required min="0" type="number" className="form-control" id="price" placeholder="Set a Price" name="price" />

                                                <div className="invalid-feedback">
                                                    Please enter product price.
                                                </div>
                                            </div>


                                            <div className="col-12 d-flex justify-content-center flex-column bd-highlight mb-3">
                                                <label className="form-label">Categories</label>
                                                <div className="row ms-3">
                                                    <div className="me-3 form-check col-12 col-md-2">
                                                        <input type="checkbox" className="form-check-input" id="Sports" name="Sports" />
                                                        <label className="form-check-label" htmlFor="Sports">Sports</label>
                                                    </div>
                                                    <div className="me-3 form-check col-12 col-md-2">
                                                        <input type="checkbox" className="form-check-input" id="Books" name="Books" />
                                                        <label className="form-check-label" htmlFor="Books">Books</label>
                                                    </div>
                                                    <div className="me-3 form-check col-12 col-md-2">
                                                        <input type="checkbox" className="form-check-input" id="Games" name="Games" />
                                                        <label className="form-check-label" htmlFor="Games">Games</label>
                                                    </div>
                                                    <div className="me-3 form-check col-12 col-md-2">
                                                        <input type="checkbox" className="form-check-input" id="Utilities" name="Utilities" />
                                                        <label className="form-check-label" htmlFor="Utilities">Utilities</label>
                                                    </div>
                                                    <div className="me-3 form-check col-12 col-md-2">
                                                        <input type="checkbox" className="form-check-input" id="Other" name="Other" />
                                                        <label className="form-check-label" htmlFor="Other">Other</label>
                                                    </div>
                                                </div>


                                                <div className="invalid-feedback">
                                                    Please enter product category.
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 d-flex justify-content-center flex-column bd-highlight mb-3">
                                                <label htmlFor="image1" className="form-label">Upload Images</label>
                                                <input required type="file" className="form-control" id="image1" placeholder="Enter the category" name="file1" />
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
                                        <button className="w-100 btn btn-success btn-lg" type="submit">Post Ad</button>
                                    </div>
                                    <button className="w-100 btn btn-danger btn-lg" style={{ textDecoration: 'none', color: 'white' }} type="reset">Cancel</button>
                                </form>


                                <div style={{ width: '20%', overflow: 'hidden' }} className='d-none d-lg-block mt-3'>
                                    <img style={{ width: '100%' }} src='/selltag.png' alt='' />
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        AuthLoading: state.loading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sell));
