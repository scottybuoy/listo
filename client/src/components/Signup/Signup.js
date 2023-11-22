import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { signup } from '../../utils/api';
import Auth from '../../utils/Auth'

const SignupForm = () => {

    const [userFormData, setUserFormData] = useState({ username: '', password: '' })
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [authError, setAuthError] = useState({ ok: true });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!userFormData.username || !userFormData.password) {
            return;
        }
        if (userFormData.username.length < 5 || userFormData.username.length > 12) {
            setAuthError({ ok: false, message: 'Username must be between 5 and 12 characters in length' })
            return;
        }
        if (userFormData.password.length < 6 || userFormData.password.length > 20) {
            setAuthError({ ok: false, message: 'Password must be between 5 and 12 characters in length' })
            return;
        }
        const response = await signup(userFormData);
        if (!response.ok) {
            setAuthError({ ok: false, message: 'User with that username already exists' })
            throw new Error('Failed to sign up :/')
        }

        const { token, user } = await response.json();

        let userId = user._id;
        Auth.login(token, userId);

        setUserFormData({ username: '', password: '' })
    }


    return (
        <div className="container-fluid">
            <div className='row d-flex justify-content-center auth-form-anchor'>
                <div className='auth-form-title-cont'>
                    <img alt='listo icon' className='logo-main' src='/images/listo-blue.png'></img>
                    <h3 className='auth-form-title'>Sign up!</h3>
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex justify-content-center'>
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
                            <div className='input-cont'>
                                <input
                                    className='custom-input'
                                    name='password'
                                    type={passwordVisibility ? 'text' : 'password'}
                                    onChange={handleChange}
                                />
                                <div id='mask-password-btn'>
                                    <img
                                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                                        alt='eye icon'
                                        src={passwordVisibility ? '/images/eye-icon.png' : '/images/eye-icon-crossed.png'}
                                        id='mask-password-icon'
                                    />
                                </div>

                            </div>
                        </div>
                        {!authError.ok && (
                            <div className='auth-err-cont'>
                                <p className='auth-err-msg'>{authError.message}</p>
                            </div>
                        )}
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