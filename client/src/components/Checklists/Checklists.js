import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../utils/Auth';
import { getUserChecklists, createChecklist, deleteChecklist } from '../../utils/api';
import { formatDate } from '../../utils/helpers';
import './checklists.css'

const Checklists = () => {

    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

    const [checklistData, setChecklistData] = useState({});
    const [newChecklistForm, setNewChecklistForm] = useState(false);
    const [newChecklistFormData, setNewChecklistFormData] = useState();

    const checklistDataLength = Object.keys(checklistData).length;

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewChecklistFormData({ ...newChecklistFormData, [name]: value });
    }

    const handleFormSubmit = async () => {
        if (!newChecklistFormData.listTitle) {
            console.log('must add list title');
            return;
        };
        const response = await createChecklist(userId, newChecklistFormData);
        const newChecklist = await response.json();
        setChecklistData(newChecklist);
    }

    const handleDeleteChecklist = async (checklistId) => {
        const response = await deleteChecklist(userId, checklistId);
        const checklists = await response.json();
        setChecklistData(checklists);
    }

    const truncateChecklistTitle = (listTitle) => {
        if (listTitle?.length) {

            if (listTitle.length > 10) {
                let truncatedListTitle = '';
                for (var i = 0; i < 9; i++) {
                    truncatedListTitle += listTitle[i]
                }
                truncatedListTitle += '...';
                return truncatedListTitle;
            }
        }

        return listTitle;
    };

    useEffect(() => {

        const getChecklists = async () => {
            const response = await getUserChecklists(userId);
            const checklists = await response.json();
            setChecklistData(checklists);
        }

        getChecklists();

    }, [checklistDataLength])

    return (
        <div className='container-fluid'>
            {/* HEADER */}
            <div className='row sticky'>
                <div className='col-12 d-flex lists-header justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <Link
                            to={`/`}
                        >
                            <img alt='back button' className='back-button' src='/images/back-button.png'></img>
                        </Link>
                        <h3 className='list-title'>My Checklists</h3>
                    </div>
                    <button className='new-list-btn' onClick={() => setNewChecklistForm(!newChecklistForm)}>+</button>
                </div>
            {/* NEW LIST FORM */}
            {newChecklistForm && (

                <div className='row new-list-form-cont'>
                    <div className='col-12 d-flex justify-content-between align-items-center new-item-form'>
                        <input name='listTitle' id='new-list-input' onChange={handleFormChange}></input>
                        <button id='new-list-btn' onClick={() => {
                            handleFormSubmit();
                            setNewChecklistForm(!newChecklistForm)
                        }}>add!</button>
                    </div>
                </div>
            )}
            </div>

            {/* CHECKLISTS */}
            <div className='lists-wrapper'>
                <div className='col-12 btn-container'>
                    {!checklistData.checklists?.length && (
                        <div className='empty-list'>No checklists yet!</div>
                    )}
                    {checklistData.checklists && checklistData.checklists.map((list) => (
                        <div key={list._id}>
                            <div className='d-flex justify-content-around align-items-center'>
                                <Link
                                    key={list._id}
                                    className='link'
                                    to={`/checklist/${list._id}`}
                                >
                                    <button className='list-btn' key={list._id}>
                                        {truncateChecklistTitle(list.listTitle)}
                                    </button>
                                </ Link>
                                <p className='list-info date'>{formatDate(list.dateCreated)}</p>
                                {/* DELETE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/trashCan.png'
                                    alt='trash can icon'
                                    onClick={() => { handleDeleteChecklist(list._id) }}
                                >
                                </img>
                            </div>

                            <hr></hr>
                        </div>

                    ))}
                </div>

            </div>
        </div>
    )

}

export default Checklists;