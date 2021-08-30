import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';


const WishBtn = (props) => {
    const { Auth } = props;
    const { user } = props;
    if (Auth) {
        const favourite = (_id) => {
            const newUser = {
                ...user
            };
            newUser.favourites.push(_id)
            props.Update(newUser);
            axios.put(`/api/user/favourites/${user._id}`, {
                favourite: _id
            })
        };

        const removeFavourite = (id) => {
            if (props.removeFav) {
                props.update(id);
            };
            const newUser = {
                ...user,
                favourites: user.favourites.filter(item => item !== id)
            };
            props.Update(newUser);
            axios({
                method: 'DELETE',
                url: `/api/user/favourites/${user._id}`,
                data: {
                    favourite: id
                }
            })
        }

        function Contains(_id) {
            let i;
            for (i = 0; i < user.favourites.length; i++) {
                if (_id === user.favourites[i]) {
                    return true;
                }
            }
            return false;
        };

        //Main Function
        if (Contains(props._id)) {
            return <Button onClick={() => removeFavourite(props._id)} variant='transparent' className="non-outlined-btn text-success" ><FontAwesomeIcon size='lg' icon={faHeart} /></Button>
        } else {
            return <Button onClick={() => favourite(props._id)} variant='transparent' className="non-outlined-btn text-success" ><FontAwesomeIcon size='lg' icon={farHeart} /></Button>
        }
    } else {
        return null;
    }
};


const mapStateToProps = (state) => {
    return {
        user: state.user,
        Auth: state.Authorised
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WishBtn);