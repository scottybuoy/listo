// import toDos from './dummyData'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleChecklist, addTaskToCheckList, deleteTaskFromChecklist, toggleItemCheck } from '../../utils/api';
import Auth from '../../utils/Auth';
import './singleChecklist.css';


const Checklist = () => {

    const [checklistData, setChecklistData] = useState({});
    const [newTaskForm, setNewTaskForm] = useState(false);
    const [newTaskFormData, setNewTaskFormData] = useState({});
    const { checklistId } = useParams();
    const [checked, setChecked] = useState()
    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

    const checkListDataLength = Object.keys(checklistData).length


    const checkedClass = (toDo) => {
        return toDo.checked ? 'checked' : null;
    }

    const checkedIconClass = (toDo) => {
        return toDo.checked ? 'checked-task-icon' : null;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewTaskFormData({ ...newTaskFormData, [name]: value });
    };

    const handleFormSubmit = async () => {
        if (!newTaskFormData.taskItem) {
            return;
        }
        const response = await addTaskToCheckList(userId, checklistId, newTaskFormData);
        const checklist = await response.json();
        setChecklistData(checklist);
        console.log(checklistData);
    };

    const handleTaskDelete = async (taskId) => {
        const response = await deleteTaskFromChecklist(userId, checklistId, taskId);
        const updatedChecklist = await response.json();
        setChecklistData(updatedChecklist);
    }

    const handleTaskCheck = async (e) => {
        const taskId = e.target.value
        console.log(typeof taskId);
        const response = await toggleItemCheck(taskId);
        const checkedTask = await response.json();
        setChecklistData(checkedTask);
    }

    useEffect(() => {
        const getChecklist = async () => {
            const response = await getSingleChecklist(userId, checklistId);
            const checklist = await response.json();
            setChecklistData(checklist);
        }

        getChecklist();
    }, [checkListDataLength])

    return (

        // HEADER

        <div className='containter-fluid'>
            <div className='row'>
                <div className='col-12 list-title-cont d-flex justify-content-between align-items-center '>
                    <h3 className='list-title'>{checklistData.listTitle}</h3>
                    <button
                        className='new-item-btn d-flex align-items-center justify-content-center'
                        onClick={() => {
                            setNewTaskForm(!newTaskForm);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
            {/* NEW TASK FORM */}
            {newTaskForm && (

                <div className='row new-item-form-cont'>
                    <div className='col-12 d-flex justify-content-between align-items-center new-item-form'>
                        <input name='taskItem' id='new-list-input' onChange={handleFormChange}></input>
                        <button id='new-list-btn' onClick={() => {
                            handleFormSubmit();
                            setNewTaskForm(!newTaskForm)
                        }}>add!</button>
                    </div>
                </div>
            )}

            {/* TASKS */}

            <div className='row list-wrapper'>
                <div className='col-12 my-4'>
                    {!checklistData.tasks ? (
                        <div>loading</div>
                    ) : (
                        checklistData.tasks.map((task) => (
                            <div key={task._id} className={`todo-cont d-flex justify-content-between align-items-center ${checkedClass(task)}`}>
                                <div className='d-flex justify-content-between todo-and-check'>
                                    <div className='checkbox-cont'>
                                        <input
                                        className='checkbox'
                                        type='checkbox'
                                        value={task._id}
                                        onChange={handleTaskCheck}
                                        checked={task.checked ? 'checked' : ''}
                                        >
                                        </input>
                                    </div>
                                    <div className='task-cont'>
                                        <p className='task m-0'>{task.taskItem}</p>
                                    </div>
                                </div>
                                <div className='todo-details-cont d-flex justify-content-between'>
                                    {/* NOTES BUTTON */}

                                    <img
                                        className={`notes-icon ${checkedIconClass(task)}`}
                                        src='/images/notes-icon.png'
                                        alt='notes icon'
                                    >
                                    </img>

                                    {/* EDIT BUTTON */}
                                    <img
                                        className={`edit-pencil ${checkedIconClass(task)}`}
                                        src='/images/edit-pencil.png'
                                        alt='edit icon'
                                    >
                                    </img>

                                    {/* DELETE BUTTON */}
                                    <img
                                        className={`trash-can ${checkedIconClass(task)}`}
                                        src='/images/trashCan.png'
                                        alt='trash can icon'
                                        onClick={() => { handleTaskDelete(task._id) }}
                                    >
                                    </img>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Checklist;