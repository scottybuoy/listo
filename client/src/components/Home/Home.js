import React, { useEffect, useState } from 'react';
import Auth from '../../utils/Auth'
import LoginForm from '../LoginForm/LoginForm';
import ListIndex from '../ListIndex/ListIndex';

const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

const Home = () => {

    return (
        <div>
            {Auth.loggedIn() ? (
                <ListIndex />
            ) : (
                <LoginForm />
            )}
        </div>
        
    )
}

export default Home;