import Navbar from './components/Navbar';
import Body from './Body';
import Footer from './components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';

function App(props) {
    const { user, Update, auth, loading } = props;
    const { notifications } = props.user

    const socket = useRef(null);
    const notifs = useRef(notifications);
    const addNotif = useRef(null);

    useEffect(() => {
        const ENDPOINT = 'https://iitisoc-4sale.herokuapp.com/';
        socket.current = io(ENDPOINT, { transports: ['websocket', 'polling'] });
    }, []);

    useEffect(() => {
        addNotif.current = notif => {
            Update({
                ...user,
                notifications: [...notifs.current, notif]
            })
        }
    }, [user, Update])

    useEffect(() => {
        notifs.current = notifications;
    }, [loading, notifications])

    useEffect(() => {
        if (auth) {
            socket.current.emit('join', user.email);
            console.log("joined");

            socket.current.on('notification', (notif) => {
                console.log(notif)
                addNotif.current(notif)
                toast.success(notif.userName + ' ' + notif.message + ' ' + notif.itemTitle)
            });
            console.log("listening");
        }
    }, [auth, user.email, addNotif]);

    // const socket = useRef(null);
    // useEffect(() => {
    //     const ENDPOINT = 'https://iitisoc-4sale.herokuapp.com/';
    //     socket.current = io(ENDPOINT, { transports: ['websocket', 'polling'] });
    //     console.log("connection")
    // }, [])

    // useEffect(() => {
    //     if (auth && socket.current !== null) {
    //         socket.current.emit('join', user.email);
    //         console.log("Connected to room: " + user.email)
    //     }
    // }, [auth, user.email]);

    // useEffect(prevProps => {
    //     if (socket.current !== null) {
    //         socket.current.on('notification', (notif) => {
    //             console.log(notif);
    //             if (user.email !== '') {
    //                 Update({
    //                     ...user,
    //                     notifications: [...notifications, notif]
    //                 })
    //                 toast.success(notif.userName + ' ' + notif.message + ' ' + notif.itemTitle)
    //             }
    //         })
    //     }
    // })

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '90vh' }}>
                <Body />
            </div>
            <ScrollToTop />
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    );

}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.Authorised,
        loading: state.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
