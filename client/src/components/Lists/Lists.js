import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import { getUserLists, newList, deleteList } from '../../utils/api';
import { listCategories } from './listCategories';
import './lists.css'

const Lists = ({ lists, userId }) => {

    // HOOKS
    const [newListForm, setNewListForm] = useState(false);
    const [newListFormData, setNewListFormData] = useState({ listType: 'Grocery' });
    const [listData, setListData] = useState({});

    const listDataLength = Object.keys(listData).length;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewListFormData({ ...newListFormData, [name]: value })
        console.log(newListFormData);
    }

    const handleFormSubmit = async () => {
        if (!newListFormData.listTitle) {
            console.log('must add list title');
            return
        };

        const response = await newList(userId, newListFormData);
        const list = await response.json();
        setListData(list);
    }

    const handleListDelete = async (listId) => {
        const response = await deleteList(userId, listId);
        const lists = await response.json();
        setListData(lists);
    }

    useEffect(() => {
        const findLists = async () => {
            const response = await getUserLists(userId);
            const lists = await response.json();
            setListData(lists);
            console.log('LISTDATA', listDataLength, listData);
        }

        findLists();

    }, [listDataLength])

    return (
        <>
            {/* BUTTON TO OPEN NEW LIST FORM */}
            <div className='row'>
                <div className='col-12 d-flex lists-header justify-content-between align-items-center'>
                    {/* <Link
                    className='link'
                    to={`/${userId}/newList`}
                >
                    <button className='new-list-btn my-4' onClick={() => setNewListForm(!newListForm)}>+</button>
                </Link> */}
                    <h3 className='list-title'>My Lists</h3>
                    <button className='new-list-btn' onClick={() => setNewListForm(!newListForm)}>+</button>
                </div>
            </div>
            {/* NEW LIST FORM */}
            {newListForm && (

                <div className='row new-list-form-cont'>
                    <div className='col-12 d-flex justify-content-between align-items-center new-list-form'>
                        <input name='listTitle' id='new-list-input' onChange={handleChange}></input>
                        <select name='listType' id='category-menu' onChange={handleChange}>
                            {listCategories.map((category) => (
                                <option key={category}>{category}</option>
                            ))}
                        </select>
                        <button id='new-list-btn' onClick={() => {
                            handleFormSubmit();
                            setNewListForm(!newListForm)
                        }}>add!</button>
                    </div>
                </div>
            )}

            {/* LISTS */}
            <div className='my-5'>
                <div className='col-12 btn-container'>
                    {listData.userLists && listData.userLists.map((list) => (
                        <div key={list._id}>
                            <div className='d-flex justify-content-around align-items-center'>
                                <Link
                                    key={list._id}
                                    className='link'
                                    to={`/${userId}/list/${list._id}`}
                                >
                                    <button className='list-btn' key={list._id}>
                                        {list.listTitle}
                                    </button>
                                </ Link>
                                <p className='list-info'>{list.listType}</p>
                                <p className='list-info date'>{formatDate(list.dateCreated)}</p>
                                {/* DELETE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/trashCan.png'
                                    alt='trash can icon'
                                    onClick={() => {handleListDelete(list._id)}}
                                >
                                </img>
                            </div>

                            <hr></hr>
                        </div>

                    ))}
                </div>

            </div>
        </>
    )
}

export default Lists;