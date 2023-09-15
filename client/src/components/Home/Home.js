import React, { useEffect, useState } from 'react';
import Auth from '../../utils/Auth'
import LoginForm from '../LoginForm.js/LoginForm';
import Lists from '../Lists/Lists';
import ListIndex from '../ListIndex/ListIndex';

const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

const Home = () => {
    const [listData, setListData] = useState([]);

    return (
        <div>
            {Auth.loggedIn() ? (
                // <Lists
                // lists={listData}
                // test={'test'}
                // userId={userId}
                // />
                <ListIndex />
            ) : (
                <LoginForm />
            )}
        </div>
        
    )
}

export default Home;