import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginform.css';
import { login } from '../../utils/api';
import Auth from '../../utils/Auth'

const LoginForm = () => {

    const [userFormData, setUserFormData] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await login(userFormData);
        if (!response.ok) {
            throw new Error('Failed to login')
        }

        const { token, user } = await response.json();

        let userId = user._id;
        Auth.login(token, userId);

        setUserFormData({ username: '', password: '' })
    }


    return (
        <div className="container-fluid">
            <div className='row d-flex justify-content-center'>
                <div className='col-sm-12 col-lg-4  d-flex justify-content-center'>
                    <form
                        id='login-form'
                        onSubmit={handleSubmit}
                    >
                        <div className='form-field'>
                            <label className='label'>username:</label>
                            <input
                                className='custom-input'
                                name='username'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <label className='label'>password:</label>
                            <input
                                className='custom-input'
                                name='password'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='d-flex justify-content-around mt-3 form-buttons'>
                            <div className='d-flex align-items-center'>
                                <h6 className='sign-up-prompt'>New here? </h6>
                                <Link
                                className='sign-up-link'
                                    to={`/signup`}
                                >
                                    <h6>Sign Up</h6>
                                </Link>
                            </div>
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