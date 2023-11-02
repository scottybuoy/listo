import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth'
import './listIndex.css';

const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
const username = Auth.getProfile().data?.username;


const ListIndex = () => {
    return (
        <div className=''>
            <div className='col-12 list-index-header d-flex'>
                <img alt='listo logo' src='/images/listo-blue.png' id='listo-logo'></img>
                <div className='greeting'>
                    <p className='m-0 hello'>hello,</p>
                    <p className='m-0' id='username'>{username}<span>!</span></p>
                </div>
            </div>
            <div className='list-index-cont'>

                {/* SHOPPING LISTS ICON */}

                <Link
                    className='link'
                    to={`/${userId}/my-lists`}
                >
                    <div className='d-flex justify-content-center align-items-center list-type-cont'>
                        <div className='icon-cont'>
                            <button className='list-type-btn'>
                                <img alt='shopping bag icon' className='list-type-icon' id='shopping-list-icon' src='/images/shopping-list-white.png'></img>
                            </button>
                        </div>
                        <div className='list-type-title-cont'>
                            <h3>Shopping Lists</h3>
                        </div>
                    </div>
                </Link>

                {/* <hr></hr> */}

                {/* CHECKLISTS ICON */}

                <Link
                    className='link'
                    to={`/checklists`}
                >
                    <div className='d-flex justify-content-center align-items-center list-type-cont'>
                        <div className='icon-cont'>
                            <button className='list-type-btn'>
                                <img alt='checklist icon' className='list-type-icon' id='checklist-icon' src='/images/checklist-white.png'></img>
                            </button>
                        </div>
                        <div className='list-type-title-cont'>
                            <h3>Checklists</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ListIndex;