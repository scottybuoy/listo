import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { signup } from '../../utils/api';
import Auth from '../../utils/Auth'

const SignupForm = () => {

    const [userFormData, setUserFormData] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await signup(userFormData);
        if (!response.ok) {
            throw new Error('Failed to sign up :/')
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
                            <div className='align-items-center'>
                                <h6 className='sign-up-prompt'>Already a user? </h6>
                                <Link
                                className='sign-up-link'
                                    to={`/`}
                                >
                                    <h6>Log In</h6>
                                </Link>
                            </div>
                            <button
                                id='login-btn'
                                type='submit'
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;