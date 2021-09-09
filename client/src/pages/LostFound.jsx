import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap'
import Spinner from '../components/Spinner'
import { withRouter } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify';

function LostFound(props) {

    const { user, auth } = props;
    const [posting, setPosting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [statusInput, setStatusInput] = useState('')
    const [lost, setLost] = useState([]);
    const [found, setFound] = useState([]);

    useEffect(() => {
        axios.get('/api/lost-found/')
            .then(res => {
                setLost([
                    ...res.data.filter(item => item.status === 'lost')
                ]);

                setFound([
                    ...res.data.filter(item => item.status === 'found')
                ]);
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
                toast.error('Could not fetch items')
            })
    }, [])

    const handleClaim = (id, status, title) => {
        if (auth) {
            let notification = {
                itemTitle: title,
                userName: user.name,
                userEmail: user.email,
                mobile: user.mobile,
                dp: user.profilePic
            }
            if (status === 'lost') {
                notification['message'] = `found your`
            } else {
                notification['message'] = `wants to claim`
            }
            axios.put(`/api/lost-found/notify/${id}`, { notification: notification })
                .then(res => {
                    const updated = {
                        ...res.data.item,
                        claimed: true
                    }
                    if (status === 'lost') {
                        setLost(prev => [...prev.filter(item => { return item._id !== id }), updated])
                    } else {
                        setFound(prev => [...prev.filter(item => { return item._id !== id }), updated])
                    }
                    toast.success(res.data.message);
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Failed to notify");
                })
        }
        else {
            toast.error("Please Login first");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPosting(true)
        const formData = e.target
        const newItem = new FormData(formData)

        newItem.append('userName', user.name);
        newItem.append('userEmail', user.email);

        axios.post('/api/lost-found', newItem)
            .then(res => {
                console.log(res.data)
                toast.success(`Posted Ad for ${res.data.title}`);
                const { status } = res.data
                if (status === 'lost') {
                    setLost(prev => [res.data, ...prev])
                } else {
                    setFound(prev => [res.data, ...prev])
                }
                setPosting(false)
            })
            .catch(err => {
                console.log(err);
                setPosting(false)
                toast.error("Failed to post");

            })
    };

    function Data(props) {
        return (
            <>
                {
                    loading ? <Spinner /> :
                        <div className="container">
                            {
                                props.status.map((item) =>
                                    <div className="row my-2 gap-3 gap-md-0" key={item._id} >
                                        <div className="col-12 col-md-3">
                                            {
                                                <img src={item.images ? item.images.url : `${item.status}.jpg`} alt="Item" style={{ height: '200px', width: '90%' }} />
                                            }
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <p>{item.date.slice(0, 10)}</p>
                                            <div>Added by {item.userName} </div>
                                            <div className="row">
                                                <div className='col-12 col-md-10' >Email: {item.userEmail}</div>
                                                <div className='col-12 col-md-2 mt-2' >
                                                    {
                                                        item.claimed ? <Button disabled size='sm' onClick={() => handleClaim(item._id, item.status, item.title)} > {item.status === 'lost' ? 'Found' : 'Claimed'} </Button>
                                                            : <Button size='sm' onClick={() => handleClaim(item._id, item.status, item.title)} > {item.status === 'lost' ? 'I found' : 'Claim'} </Button>
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
            </>
        )
    }
    return (
        <>
            {
                posting === true ? <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} ><h2 className="text-center">Posting...</h2></div> :
                    <div className="my-4 container-lg">
                        <Tabs
                            defaultActiveKey="lost"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="lost" title="Lost">
                                <Data status={lost} />
                            </Tab>
                            <Tab eventKey="found" title="Found">
                                <Data status={found} />
                            </Tab>
                            <Tab eventKey="add" title="Add" >
                                <div className="d-flex flex-wrap justify-content-center">
                                    <form className="needs-validation" id="itemForm" noValidate="" onSubmit={handleSubmit} >
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label htmlFor="productTitle" className="form-label">Title<span className='text-danger fw-bold'>*</span></label>
                                                <input autoCapitalize="sentences" required type="text" className="form-control custom-form" id="productTitle" placeholder="Enter Title" name="title" />
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Description<span className='text-danger fw-bold'>*</span> </label>
                                                <div className="input-group has-validation">
                                                    <textarea autoCapitalize="sentences" required className="form-control custom-form" id="description" placeholder="Enter Description" name="description" />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center flex-column bd-highlight mb-3">

                                                <div className="col-12  d-flex justify-content-center flex-column bd-highlight mb-3">

                                                    <label htmlFor='status' className="form-label">I ___ this <span className='text-danger fw-bold'>*</span></label>

                                                    <select onChange={(e) => setStatusInput(e.target.value)} className="form-select" aria-label="Default select example" name="status" id="status" required>
                                                        <option value="">...</option>
                                                        <option value="lost">lost</option>
                                                        <option value="found">found</option>
                                                    </select>
                                                </div>

                                                <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-4">
                                                    <label htmlFor="date" className="form-label" required>Date of Lost/Found<span className='text-danger fw-bold'>*</span></label>
                                                    <input required min="0" type="date" className="form-control" id="date" placeholder="Choose Date" name="date" />
                                                </div>

                                                <div className="col-12 col-md-6 d-flex justify-content-center flex-column bd-highlight mb-3">
                                                    <label htmlFor="image1" className="form-label">Upload Image</label>
                                                    <input type="file" className="form-control" id="image1" placeholder="Required" name="file1" required={statusInput === 'found' ? true : false} />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="my-4" />
                                        <div className="d-flex flex-column bd-highlight mb-3 justify-content-evenly ">
                                            <button className="w-100 btn btn-success btn-lg" type="submit">Post</button>
                                        </div>
                                        <button className="w-100 btn btn-danger btn-lg" style={{ textDecoration: 'none', color: 'white' }} type="reset">Cancel</button>
                                    </form>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
            }

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.Authorised
    }
};

export default withRouter(connect(mapStateToProps)(LostFound));