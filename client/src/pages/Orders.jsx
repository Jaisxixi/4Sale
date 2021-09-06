import React, { Component } from 'react';
import ItemList from '../components/ItemList';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import axios from 'axios';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        const { user } = this.props
        for (let i = 0; i < user.orders.length; i++) {
            const element = user.orders[i];

            axios.get(`/api/items/${element._id}`)
                .then(res => {
                    this.setState({
                        orders: [...this.state.orders, res.data],
                        loading: false
                    })
                })

        }

    };

    render() {
        const update = (id) => {
            const newItems = this.state.items.filter(item => item._id !== id);
            this.setState({
                ...this.state,
                items: newItems,
                number: newItems.length
            });
        }
        if (this.state.loading) {
            return (
                <Spinner />
            )
        }
        return (
            <>
                <div className="results">
                    <h2 className='text-center py-3' >Your Orders</h2>
                </div>
                <div className='pb-5'>
                    <ItemList items={this.state.orders} update={update} removeSold={false} removeFav={true} />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));

