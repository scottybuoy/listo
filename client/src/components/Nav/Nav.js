import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import ProfileModal from './ProfileModal/ProfileModal';
import './nav.css';

const Nav = () => {

    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
    // const userId = user.data._id;
    const [profileModal, setProfileModal] = useState(false);


    return (
        <div className='container-fluid p-0 nav-cont'>
            <div className='col-12 nav'>
                <div className='d-flex justify-content-between align-items-center inner-nav'>
                    {/* <img alt='listo logo' id='logo' src='/images/listo-sm.png'></img> */}
                    <Link
                        to={`/share-lists`}
                    >
                        <img
                            alt='messages icon'
                            src='/images/messages-icon.png'
                            id='messages-icon' className='nav-icon'
                            onClick={() => { setProfileModal(false) }}
                        >
                        </img>
                    </Link>
                    <Link
                        className='link'
                        to='/'
                    >
                        {/* <h6 className='nav-item'>my lists</h6> */}
                        <img
                            alt='home icon ok sheesh'
                            src='/images/home-icon.png'
                            id='home-icon'
                            className='nav-icon'
                            onClick={() => {setProfileModal(false)}}
                        >
                        </img>
                    </Link>
                    {/* {Auth.loggedIn() ? (
                        <h6 className='nav-item' onClick={() => { Auth.logout(); }}>logout</h6>
                    ) : (
                        <Link
                            className='link'
                            to={'/login'}
                        >
                            <h6 className='nav-item'>login</h6>
                        </Link>
                    )} */}
                    <img
                        alt='profile icon'
                        src='/images/profile-icon.png'
                        className='nav-icon'
                        id='profile-icon'
                        onClick={() => {if (Auth.loggedIn()) {setProfileModal(!profileModal);}}}
                    >
                    </img>

                    {profileModal && (
                        <ProfileModal />
                    )}

                </div>
            </div>
        </div>
    )
}

export default Nav;