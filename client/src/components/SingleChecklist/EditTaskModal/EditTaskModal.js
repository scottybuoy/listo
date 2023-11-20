import React, { useState } from 'react';
import { editTask } from '../../../utils/api';
import Auth from '../../../utils/Auth';

const EditTaskModal = ({task, setChecklistData, toggleEditTaskModal, setToggleEditTaskModal}) => {

    // HOOKS
    const [taskFormData, setTaskFormData] = useState(task)
    const userID = Auth.loggedIn() ? Auth.getProfile().data?._id : null;
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setTaskFormData({ ...taskFormData, [name]: value });
    }

    const handleEditItem = async (e) => {
        e.preventDefault();

        let editBody = {...taskFormData, taskId: task.taskId}

        const response = await editTask(userID, editBody);
        const updatedItem = await response.json();

       
        setChecklistData(updatedItem)
        setToggleEditTaskModal(!toggleEditTaskModal);

    }

    return (
        <div className='modal-cont d-flex justify-content-center align-items-center'>
            <form
                id='edit-item-form'
                onSubmit={handleEditItem}
            >
                <div className='d-flex justify-content-center my-2'>
                    <input
                        className='mx-3 custom-input'
                        defaultValue={task.taskItem}
                        name='taskItem'
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-center my-2'>
                    <textarea
                        className='mx-3 custom-input'
                        defaultValue={task.notes}
                        name='notes'
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-around align-items-center mt-3'>
                  
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

export default EditTaskModal;