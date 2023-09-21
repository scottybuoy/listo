import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth'
import './listIndex.css';

const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;


const ListIndex = () => {
    return (
        <div className='container-fluid vh-100'>
            <div className='list-index-cont'>

                {/* SHOPPING LISTS ICON */}

                <Link
                    className='link'
                    to={`/${userId}/my-lists`}
                >
                    <div className='d-flex justify-content-center align-items-center list-type-cont'>
                        <div className='icon-cont'>
                            <img alt='shopping bag icon' className='list-type-icon' id='shopping-list-icon' src='/images/shopping-list.png'></img>
                        </div>
                        <div className='list-type-title-cont'>
                            <h3>Shopping Lists</h3>
                        </div>
                    </div>
                </Link>

                <hr></hr>

                {/* CHECKLISTS ICON */}

                <Link
                    className='link'
                    to={`/checklists`}
                >
                    <div className='d-flex justify-content-center align-items-center list-type-cont'>
                        <div className='icon-cont'>
                            <img alt='checklist icon' className='list-type-icon' id='checklist-icon' src='/images/checklist.png'></img>
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