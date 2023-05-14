import React, { useEffect, useState } from 'react';
import Auth from '../../utils/Auth'
import LoginForm from '../LoginForm.js/LoginForm';
import Lists from '../Lists/Lists';
import { getUserLists } from '../../utils/api';


const userId = Auth.getProfile().data._id;
console.log('USER ID', userId);

const Home = () => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        const findLists = async () => {
            const response = await getUserLists(userId);
            const lists = await response.json();
            setListData(lists);
        }
    
        findLists();
    }, []);

   
  

    return (
        <div>
            {Auth.loggedIn() ? (
                <Lists
                lists={listData}
                test={'test'}
                userId={userId}
                />
            ) : (
                <LoginForm />
            )}
        </div>
        
    )
}

export default Home;