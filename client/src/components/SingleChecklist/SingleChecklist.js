// import toDos from './dummyData'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleChecklist, addTaskToCheckList, deleteTaskFromChecklist, toggleItemCheck } from '../../utils/api';
import EditTaskModal from './EditTaskModal/EditTaskModal';
import Auth from '../../utils/Auth';
import './singleChecklist.css';


const Checklist = () => {

    const [checklistData, setChecklistData] = useState({});
    const [newTaskForm, setNewTaskForm] = useState(false);
    const [newTaskFormData, setNewTaskFormData] = useState({});
    const [toggleEditTaskModal, setToggleEditTaskModal] = useState(false);
    const [taskForUpdate, setTaskForUpdate] = useState({});
    const [taskNotesState, setTaskNotesState] = useState({});
    const { checklistId } = useParams();
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
    };

    const handleTaskDelete = async (taskId) => {
        const response = await deleteTaskFromChecklist(userId, checklistId, taskId);
        const updatedChecklist = await response.json();
        setChecklistData(updatedChecklist);
    }

    const handleTaskCheck = async (e) => {
        const taskId = e.target.value
        const response = await toggleItemCheck(taskId);
        const checkedTask = await response.json();
        setChecklistData(checkedTask);
    }

    useEffect(() => {

        const taskNotes = () => {
            let taskNotesObj = {};
            if (checklistData.tasks?.length) {
                for (const task of checklistData.tasks) {
                    taskNotesObj[task._id] = { notesOpen: false };
                }
            }
            setTaskNotesState(taskNotesObj);
        }

        const getChecklist = async () => {
            const response = await getSingleChecklist(userId, checklistId);
            const checklist = await response.json();
            setChecklistData(checklist);
        }

        getChecklist();
        taskNotes();
    }, [checkListDataLength])

    return (

        // HEADER
        <>
            <div className='container-fluid'>
                <div className='row sticky'>
                    <div className='col-12 lists-header d-flex justify-content-between align-items-center '>
                        <div className='d-flex align-items-center'>
                            <Link
                                className='link'
                                to={`/checklists`}
                            >
                                <img alt='back button' className='back-button' src='/images/back-button.png'></img>
                            </Link>
                            <h3 className='list-title'>{checklistData.listTitle}</h3>
                        </div>
                        <button
                            className='new-item-btn d-flex align-items-center justify-content-center'
                            onClick={() => {
                                setNewTaskForm(!newTaskForm);
                            }}
                        >
                            +
                        </button>
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
                </div>

                {/* TASKS */}

                <div
                    className='row checklist-wrapper'
                    onClick={() => { if (toggleEditTaskModal) { setToggleEditTaskModal(!toggleEditTaskModal) } }}
                >
                    <div className='col-12 my-4 p-0'>
                        {!checklistData.tasks?.length ? (
                            <div className='empty-list'>Add some tasks!</div>
                        ) : (
                            checklistData.tasks.map((task) => (
                                <div key={task._id}>
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
                                                className={task.notes ? `notes-icon ${checkedIconClass(task)}` : 'notes-icon-disabled'}
                                                src='/images/notes-icon.png'
                                                alt='notes icon'
                                                onClick={() => {
                                                    if (!task.notes?.length) {
                                                        return;
                                                    }
                                                    setTaskNotesState({ ...taskNotesState, [task._id]: { notesOpen: !taskNotesState[task._id].notesOpen } })
                                                }}
                                            >
                                            </img>

                                            {/* EDIT BUTTON */}
                                            <img
                                                className={`edit-pencil ${checkedIconClass(task)}`}
                                                src='/images/edit-pencil.png'
                                                alt='edit icon'
                                                onClick={() => {
                                                    setToggleEditTaskModal(!toggleEditTaskModal);
                                                    setTaskForUpdate({ taskId: task._id, notes: task.notes, taskItem: task.taskItem });
                                                }}
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

                                    {/* TASK NOTES */}

                                    {taskNotesState[task._id]?.notesOpen && task.notes && (
                                        <div className={task.checked ? 'checked-task-notes-cont' : 'task-notes-cont'}>{task.notes}</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>


            </div>

            {/* EDIT TASK MODAL */}

            {toggleEditTaskModal && (
                <EditTaskModal
                    task={taskForUpdate}
                    setChecklistData={setChecklistData}
                    toggleEditTaskModal={toggleEditTaskModal}
                    setToggleEditTaskModal={setToggleEditTaskModal}
                />
            )}
        </>
    )
}

export default Checklist;