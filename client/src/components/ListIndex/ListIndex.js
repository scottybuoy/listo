import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth'
import './listIndex.css';

const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;


const ListIndex = () => {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
            {/* <div className='row list-index-inner-cont'> */}
                <Link
                    to={`/${userId}/my-lists`}
                >
                    <img className='list-type-icon' id='shopping-list-icon' src='/images/shopping-list.png'></img>
                </Link>


                <Link
                    to={`/checklists`}
                >
                    <img className='list-type-icon' id='checklist-icon' src='/images/checklist.png'></img>
                </Link>
            {/* </div> */}
        </div>
    )
}

export default ListIndex;