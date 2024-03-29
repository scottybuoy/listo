import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import { getUserLists, newList, deleteList } from '../../utils/api';
import { listCategories } from './listCategories';
import Auth from '../../utils/Auth'
import './lists.css'

const Lists = () => {
    const userId = Auth.getProfile().data?._id;


    // HOOKS
    const [newListForm, setNewListForm] = useState(false);
    const [newListFormData, setNewListFormData] = useState({ listType: 'Grocery' });
    const [listData, setListData] = useState({});

    const listDataLength = Object.keys(listData).length;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewListFormData({ ...newListFormData, [name]: value })
    }

    const handleFormSubmit = async () => {
        if (!newListFormData.listTitle) {
            console.log('must add list title');
            return;
        };

        const response = await newList(userId, newListFormData);
        const list = await response.json();
        setListData(list);
        setNewListForm(!newListForm)
    }

    const handleListDelete = async (listId) => {
        const response = await deleteList(userId, listId);
        const lists = await response.json();
        setListData(lists);
    }

    const truncateListTitle = (listTitle) => {
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
        const findLists = async () => {
            const response = await getUserLists(userId);
            const lists = await response.json();
            setListData(lists);
        }

        findLists();

    }, [listDataLength])

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
                        <h3 className='list-title'>My Shopping Lists</h3>

                    </div>
                    <button className='new-list-btn' onClick={() => setNewListForm(!newListForm)}>
                        <img alt='new item icon' src='/images/plus-icon-white.png' id='new-item-icon-sm'></img>
                    </button>
                </div>
                {/* NEW LIST FORM */}
                {newListForm && (

                    <div className='row new-list-form-cont'>
                        <div className='col-12 d-flex justify-content-between align-items-center new-item-form'>
                            <input name='listTitle' id='new-list-input' onChange={handleChange}></input>
                            <select name='listType' id='category-menu' onChange={handleChange}>
                                {listCategories.map((category) => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                            <button id='new-list-btn' onClick={() => {
                                handleFormSubmit();
                            }}>
                                <img alt='new item icon' src='/images/plus-icon-white.png' id='new-item-icon-sm'></img>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* LISTS */}
            <div className='lists-wrapper'>
                <div className='col-12 btn-container'>
                    {!listData.userLists?.length && (
                        <div className='empty-list'>No lists yet!</div>
                    )}
                    {listData.userLists && listData.userLists.map((list) => (
                        <div key={list._id}>
                            <div className='d-flex justify-content-around align-items-center'>
                                <Link
                                    key={list._id}
                                    className='link'
                                    to={`/${userId}/list/${list._id}`}
                                >
                                    <button className='list-btn' key={list._id}>
                                        {truncateListTitle(list.listTitle)}
                                    </button>
                                </ Link>
                                <p className='list-info'>{list.listType}</p>
                                <p className='list-info date'>{formatDate(list.dateCreated)}</p>
                                {/* DELETE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/trashCan.png'
                                    alt='trash can icon'
                                    onClick={() => { handleListDelete(list._id) }}
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

export default Lists;