import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import './nav.css';

const Nav = () => {

    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
    // const userId = user.data._id;

    return (
        <div className='container-fluid p-0 nav-cont'>
            <div className='col-12 nav'>
                <div className='d-flex justify-content-between align-items-center inner-nav'>
                    <img alt='listo logo' id='logo' src='/images/listo-sm.png'></img>

                    <div className='d-flex align-items-center'>
                        {Auth.loggedIn() ? (
                            <h6 className='nav-item' onClick={() => { Auth.logout(); }}>logout</h6>
                        ) : (
                            <Link
                                className='link'
                                to={'/login'}
                            >
                                <h6 className='nav-item'>login</h6>
                            </Link>
                        )}
                        <Link
                            to={`/`}
                        >
                            <img alt='messages icon' src='/images/messages-icon.png' id='messages-icon' className='nav-icon'></img>
                        </Link>
                        <Link
                            className='link'
                            to='/'
                        >
                            {/* <h6 className='nav-item'>my lists</h6> */}
                            <img alt='home icon ok sheesh' src='/images/home-icon.png' id='home-icon' className='nav-icon'></img>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;