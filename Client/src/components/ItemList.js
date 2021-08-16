import React, { Component } from 'react';
import '../Combined.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

function ItemList(props) {
    const [toProduct,setToProduct]=React.useState(false);
    if(toProduct===true){
        return <Redirect to="/item"/>
    }
    const textColor = {
        color: 'black',
        textDecoration: 'none'
    };
    const { items } = props;

    const handleClick=(_id)=>{
        setToProduct(true);
        props.setItem(_id);
    }
    return (
        <div className="card-deck">
            <Container className="ContainerProperties">
                {items.map(({ _id, title, price }) => (
                    <div className="col-lg-4 cardCustom d-inline-block" key={_id} >
                        <div className="card  customCard productRedirect" id="cardBoxOutline" style={textColor}>
                            <img onClick={()=>handleClick(_id)} className="card-img-top cardImageCustom" src={`./uploads/${_id}-1`} alt="Card image cap" style={{cursor:"pointer"}}/>
                            <div className="card-body  customCard">
                                <h5 className="card-title cardText">{title}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item cardText">Rs. {price}</li>
                                    <li><button href="#" className="btn btn-primary" style={{ backgroundColor: '#62c1ad', textDecoration: 'none' }} >Add to WishList</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setItem: (_id) => {
            dispatch({ type: 'SET_ITEM_ID', payload: _id })
        }
    }
}

export default connect(null,mapDispatchToProps)(ItemList);