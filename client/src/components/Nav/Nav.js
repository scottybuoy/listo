import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import './nav.css';

const Nav = () => {

    const user = Auth.getProfile();
    const userId = user.data._id;

    return (
        <div className = 'container-fluid p-0'>
            <div className = 'col-12 d-flex justify-content-between align-items-center nav'>
                
                <img alt='listo logo' id='logo' src='/images/listo-sm.png'></img>
                
                <div className = 'd-flex'>
                    {/* {Auth.loggedIn() ? (
                    <h6 className='nav-item'>logout coant</h6>
                    ) : (
                    null
                    )} */}

                    {!Auth.loggedIn() && (
                    <Link
                    className='link'
                    to={'/login'}
                    >
                        <h6 className='nav-item'>login</h6>
                    </Link>
                    )}
                    <h6 className='mx-4 nav-item'>new list</h6>
                    <Link
                    className='link'
                    to={`/home/${userId}`}
                    >
                    <h6 className='nav-item'>my lists</h6>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;