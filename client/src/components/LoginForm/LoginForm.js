import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginform.css';
import { login } from '../../utils/api';
import Auth from '../../utils/Auth'

const LoginForm = () => {

    const [userFormData, setUserFormData] = useState({ username: '', password: '' })
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [authError, setAuthError] = useState({ok: true});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!userFormData.username || !userFormData.password) {
            return;
        }
        const response = await login(userFormData);
        if (!response.ok) {
            setAuthError({ok: false, message: 'Incorrect username or password'})
            throw new Error('Failed to login')
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
                    <h3 className='auth-form-title'>Log in!</h3>
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
                                    className='password-input'
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