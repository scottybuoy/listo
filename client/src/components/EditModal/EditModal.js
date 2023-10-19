import { useState } from 'react';
import { editTask } from '../../utils/api';
import './editModal.css';

const EditModal = () => {
    
    const [taskFormData, setTaskFormData] = useState();

    const handleChange = (event) => {
        const {name, value} = event.target
        setTaskFormData({...taskFormData, [name]: value})
    }

    const handleUpdateTask = async () => {
        const response = await editTask(taskFormData);
    }

    return (
        <div className='modal-cont d-flex justify-content-center align-items-center'>
            <form
                id='edit-item-form'
            >
                <div className='d-flex justify-content-center my-2'>
                    <input
                        className='mx-3 custom-input'
                        // defaultValue={item.itemName}
                        name='itemName'
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-center my-2'>
                    <textarea
                        className='mx-3 custom-input'
                        // defaultValue={item.notes}
                        name='notes'
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-around align-items-center mt-3'>
                    {/* QUANTITY BUTTONS */}
                    <div className='d-flex'>
                        <div
                            className='dec-button'
                            onClick={() => {

                            

                            }}
                        >
                            -
                        </div>
                        <div className='item-qty'></div>
                        <div
                            className='inc-button'
                            onClick={() => {

                            }}
                        >
                            +
                        </div>
                    </div>
                    <button
                        id='login-btn'
                        type='submit'
                    >
                        Edit
                    </button>
                </div>
            </form>
        </div>
    )
}