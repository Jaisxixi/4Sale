import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Notification.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import NOT_FOUND from './Not_Found';
import { toast } from 'react-toastify';


function Notifications(props) {
    const { user, authorised, Update } = props
    const { notifications } = props.user;
    const [notifs, setNotifs] = useState([])

    useEffect(() => {
        setNotifs(notifications.reverse())
    }, [notifications])


    function ApproveButton(props) {
        if (props.message === "wants to buy") {
            return <button type="button" style={{ fontSize: '12px' }} className="btn p-0 non-outlined-btn btn-transparent" onClick={() => handleApprove(props.userEmail, props.userName, props.itemTitle, props.itemId)}> <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-success me-2' />Approve</button>
        } else {
            return null
        }
    };

    const handleDelete = (_id) => {
        const newUser = {
            ...user,
            notifications: user.notifications.filter(notif => notif._id !== _id)
        }
        Update(newUser);

        axios({
            method: 'DELETE',
            url: `/api/user/notif/${props.user._id}`,
            data: {
                id: _id
            }
        })
            .then(res => {
                toast.success('Deleted Successfully')
            })
    };

    const handleApprove = (userEmail, userName, title, itemId) => {
        axios.put(`/api/user/approve/${userEmail}`, {
            _id: user._id,
            notification: {
                message: `approved buy-request for`,
                itemTitle: title,
                userName: user.name,
                userEmail: user.email,
                mobile: user.mobile,
                dp: user.imageUrl,
                itemId: itemId
            }
        })
            .then(res => {
                setNotifs(res.data.notifications);
                toast.success(res.data.msg)
            })
    }

    return (<>
        <section className="section">
            <div className="section__container">
                {authorised ? notifications.length > 0 ? notifs.map(({ itemTitle, _id, message, userName, userEmail, mobile, dp, itemId }) => (
                    <div className="notification-list bg-light" key={_id}>
                        <div className="notification-list__image">
                            <img src={dp} alt="" style={{ width: 'inherit', height: 'inherit' }} />
                        </div>
                        <div className="notification-list__info">
                            <h2>{userName}{' '} {message}{' '}{itemTitle}</h2>
                            <span className="hour">
                                {userEmail}
                            </span>
                            <span className="date">
                                {mobile}
                            </span>
                            <div  >
                                <ApproveButton itemTitle={itemTitle} message={message} userEmail={userEmail} userName={userName} itemId={itemId} />
                            </div >
                            <div className="delete btn" onClick={() => handleDelete(_id)}>
                                <FontAwesomeIcon icon={faTrash} className='text-danger' />
                            </div>
                        </div>
                    </div>
                )) : <div className="text-center">No Notifications!</div> : <NOT_FOUND />}
            </div>
        </section>
    </>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        authorised: state.Authorised
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
