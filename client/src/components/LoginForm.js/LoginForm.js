import React, { useState } from 'react';
import './loginform.css';
import { login } from '../../utils/api';
import Auth from '../../utils/Auth'

const LoginForm = () => {

    const [userFormData, setUserFormData] = useState({username: '', password: ''})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(userFormData);
        const response = await login(userFormData);
        console.log('response', response)
        if (!response.ok) {
            throw new Error('Failed to login')
        }
        
        const { token, user } = await response.json();
        console.log('login button clicked')
        console.log('User', user);
        let userId = user._id;
        Auth.login(token, userId);

        setUserFormData({username: '', password: ''})
    }


    return (
        <div className="container-fluid my-5">
            <div className='row d-flex justify-content-center'>
                <div className='col-sm-12 col-lg-4  d-flex justify-content-center'>
                    <form
                        id='login-form'
                        onSubmit={handleSubmit}
                    >
                        <div className='d-flex justify-content-center my-2'>
                            <label>username:</label>
                            <input
                                className='mx-3 custom-input'
                                name='username'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center my-2'>
                            <label>password:</label>
                            <input
                                className='mx-3 custom-input'
                                name='password'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <button 
                                id='login-btn'
                                type='submit'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;