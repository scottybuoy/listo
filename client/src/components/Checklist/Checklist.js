import toDos from './dummyData'
import './checklist.css';


const Checklist = () => {

    const checkedClass = (toDo) => {
        return toDo.checked ? 'checked' : null;
    }

    return (

        // HEADER

        <div className='containter-fluid'>
            <div className='row'>
                <div className='col-12 list-title-cont d-flex justify-content-between align-items-center'>
                    <h3 className='list-title'>Checklist</h3>
                    <button
                        className='new-item-btn d-flex align-items-center justify-content-center'

                    >
                        +
                    </button>
                </div>
            </div>

            {/* TASKS */}

            <div className='row'>
                <div className='col-12 my-4'>
                    {toDos.map((toDo) => (
                        <div key={toDo.task} className={`todo-cont d-flex justify-content-between align-items-center ${checkedClass(toDo)}`}>
                            <div className='d-flex justify-content-between todo-and-check'>
                                <div className='checkbox-cont'>
                                    <input className='checkbox' type='checkbox'></input>
                                </div>
                                <div className='task-cont'>
                                    <p className='task m-0'>{toDo.task}</p>
                                </div>
                            </div>
                            <div className='todo-details-cont d-flex justify-content-between'>
                                {/* NOTES BUTTON */}

                                <img
                                    className='notes-icon'
                                    src='/images/notes-icon.png'
                                    alt='notes icon'
                                >
                                </img>

                                {/* EDIT BUTTON */}
                                <img
                                    className='edit-pencil'
                                    src='/images/edit-pencil.png'
                                    alt='edit icon'
                                >
                                </img>

                                {/* DELETE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/trashCan.png'
                                    alt='trash can icon'
                                >
                                </img>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Checklist;