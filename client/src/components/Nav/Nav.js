import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import './nav.css';

const Nav = () => {

    const user = Auth.getProfile();
    const userId = user.data._id;

    return (
        <div className = 'container-fluid p-0'>
            <div className = 'd-flex justify-content-between align-items-center'>
                <div>
                    logo
                </div>
                <div className = 'd-flex'>
                    {Auth.loggedIn() ? (
                    <h6>logout coant</h6>
                    ) : (
                    null
                    )}
                
                    <Link
                    to={'/login'}
                    >
                        <h6 className=''>login</h6>
                    </Link>
                    <h6 className='mx-4'>new list</h6>
                    <Link
                    to={`/home/${userId}`}
                    >
                    <h6 className=''>my lists</h6>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;