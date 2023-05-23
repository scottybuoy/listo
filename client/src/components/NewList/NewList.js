import React, { useState }from 'react';
import { useParams } from 'react-router-dom';
import { newList } from '../../utils/api'
import './newList.css';

const NewList = () => {

    const [listFormData, setListFormData] = useState({});
    const { userId }= useParams();

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setListFormData({ ...listFormData, [name]: value });
        console.log('in change lfd', listFormData)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('LIST FORM DATA', )
        newList(userId, listFormData);

    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-md-8 col-lg-6 d-flex justify-content-center'>
                <form
                        id='new-list-form'
                        onSubmit={handleSubmit}
                    >
                        <div className='d-flex justify-content-center my-2'>
                            <label>list:</label>
                            <input
                                className='mx-3 custom-input'
                                name='listTitle'
                                onChange={handleFormChange}
                            />
                        </div>
                        {/* <div className='d-flex justify-content-center my-2'>
                            <label>password:</label>
                            <input
                                className='mx-3 custom-input'
                                name='password'
                                // onChange={handleChange}
                            />
                        </div> */}
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

export default NewList