import React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getUser } from '../../utils/api';
import Auth from '../../utils/Auth';
import ProfileModal from './ProfileModal/ProfileModal';
import { useReceivedListsContext } from '../../utils/GlobalState';
import './nav.css';

const Nav = () => {
    const { receivedLists, setReceivedLists } = useReceivedListsContext();


    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
    const [profileModal, setProfileModal] = useState(false);
    const receivedListsLength = Object.keys(receivedLists).length;

    useEffect(() => {
        // const getReceivedLists = async () => {
        //     const response = await getUser(userId);
        //     const userData = await response.json();
        //     console.log(userData.receivedLists.length);
        //     setReceivedListData(userData.receivedLists)
        // }

        const getReceivedLists = () => {
            if (!userId) {
                return;
            }
            getUser(userId)
                .then((response) => response.json())
                .then((userData) => {
                    const allReceivedLists = userData.receivedLists.concat(userData.receivedChecklists);
                    setReceivedLists(allReceivedLists)
                    // setReceivedListData(userData.receivedLists);
                })
        }

        getReceivedLists();
    }, [receivedListsLength]);

    return (
        <div className='container-fluid p-0 nav-cont'>
            <div className='col-12 nav'>
                <div className='d-flex justify-content-between align-items-center inner-nav'>

                    {/* SHARE LIST INDEX */}

                    <Link
                        to={`/share-lists`}
                    >
                        <div className={receivedLists?.length > 0 ? 'received-list-notification' : 'received-list-notification-hidden'}>{receivedLists?.length}</div>
                        <img
                            alt='messages icon'
                            src='/images/messages-icon.png'
                            id='messages-icon' className='nav-icon'
                            onClick={() => { setProfileModal(false) }}
                        >
                        </img>
                    </Link>

                    {/* HOME */}

                    <Link
                        className='link'
                        to='/'
                    >
                        <img
                            alt='home icon ok sheesh'
                            src='/images/home-icon.png'
                            id='home-icon'
                            className='nav-icon'
                            onClick={() => { setProfileModal(false) }}
                        >
                        </img>
                    </Link>

                    {/* PROFILE BUTTON */}

                    <img
                        alt='profile icon'
                        src='/images/profile-icon.png'
                        className='nav-icon'
                        id='profile-icon'
                        onClick={() => { if (Auth.loggedIn()) { setProfileModal(!profileModal); } }}
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