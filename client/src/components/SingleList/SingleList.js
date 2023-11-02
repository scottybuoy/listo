import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { deleteItem, addItemWithCategory, getListCategories, addItemToCategory } from "../../utils/api";
import Auth from '../../utils/Auth';
import './singleList.css';
import UpdateItemModal from './UpdateItemModal/UpdateItemModal';
import allCategories from './CategoryMenu/CategoryMenu';


const SingleList = () => {

    // HOOKS
    const { listId } = useParams();
    const [listData, setListData] = useState({});
    const [notesObjState, setNotesObjState] = useState({});
    const [addToCategoryForm, setAddToCategoryForm] = useState({})
    const [emptyCategories, setEmptyCategories] = useState(true);
    const [newItemForm, setNewItemForm] = useState(false);
    const [newItemData, setNewItemData] = useState({ category: 'Misc' })
    const [itemToCategoryData, setItemToCategoryData] = useState()
    const [toggleUpdateItemModal, setToggleUpdateItemModal] = useState(false);
    const [itemForUpdate, setItemForUpdate] = useState({});

    const userId = Auth.getProfile().data?._id;

    const listDataLength = Object.keys(listData).length;

    const handleItemDelete = async (itemId, listId, categoryId) => {
        const response = await deleteItem(itemId, listId, categoryId);
        const updatedList = await response.json();
        setListData(updatedList);

    }

    const handleAddItemWithCategory = async () => {
        if (!newItemData.itemName) {
            return;
        }
        const response = await addItemWithCategory(listId, newItemData);
        const newItem = await response.json();
        setListData(newItem);
        setNewItemForm(!newItemForm);
    }

    const handleAddItemToCategory = async (categoryId) => {
        if (!itemToCategoryData?.itemName) {
            return;
        }
        const response = await addItemToCategory(categoryId, itemToCategoryData);
        const category = await response.json();
        setAddToCategoryForm({});
        setListData(category);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!e.target.value) {
            return
        }
        setNewItemData({ ...newItemData, [name]: value });
    }

    const handleAddItemToCategoryChange = (e) => {
        const { name, value } = e.target;
        setItemToCategoryData({...itemToCategoryData, [name]: value})
    }

    const displayEmptyMessage = () => {
        setEmptyCategories(true);
        if (!listData.categories) {
            return;
        }
        listData.categories.forEach((category) => {
            if (category.items.length) {
                setEmptyCategories(false)
            }
        })
    }

    // CREATE INITIAL STATE FOR NOTES OBJECT
    const notesObjPromise = async () => {
        const buildNotesObj = new Promise((resolve, reject) => {
            const createNotesObj = (listData) => {

                if (!listData.categories) {

                    return;
                }

                let notesObj = {};

                for (const category of listData.categories) {

                    for (let i = 0; i < category.items.length; i++) {
                        notesObj[category.items[i]._id] = { notesOpen: false }
                    }
                }

                return notesObj;

            }
            resolve(createNotesObj(listData));
            reject('Error');

        })

        const notesObj = await buildNotesObj;
        setNotesObjState(notesObj);
    }

    const handleAddItemClick = (category) => {
        setAddToCategoryForm({ [category]: { formOpen: !addToCategoryForm[category]?.formOpen } })
    }

    useEffect(() => {

        const findCategories = async () => {
            const response = await getListCategories(listId);
            const categories = await response.json();
            setListData(categories);
        }
        
        findCategories();
        notesObjPromise();
        displayEmptyMessage();
    }, [listDataLength]);

    return (

        // HEADER

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 lists-header d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <Link
                            to={`/${userId}/my-lists`}
                        >
                            <img alt='back button' className='back-button' src='/images/back-button.png'></img>
                        </Link>
                        <h3 className='list-title'>{listData.listTitle}</h3>
                    </div>
                    <button
                        className='new-item-btn d-flex align-items-center justify-content-center'
                        onClick={() => {
                            setNewItemForm(!newItemForm)
                        }}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* NEW ITEM FORM */}
            {newItemForm ? (
                <div className='row new-item-form-cont'>
                    <div className={`col-12 d-flex align-items-center justify-content-between ${newItemForm ? 'new-item-form' : 'new-item-form-closed'}`}>
                        <input
                            id='new-item-input'
                            name='itemName'
                            onChange={handleChange}
                        >
                        </input>
                        <select id='category-menu' name='category' onChange={handleChange}>
                            {allCategories.map((category) => (
                                <option key={category}>{category}</option>
                            ))}
                        </select>

                        <button id='new-item-btn' onClick={handleAddItemWithCategory}>add!</button>
                    </div>
                </div>
            ) : (
                null
            )}

            {/* LIST CONTAINER */}

            <div
                className='row d-flex justify-content-center shopping-list-wrapper'
                onClick={() => { if (toggleUpdateItemModal) { setToggleUpdateItemModal(!toggleUpdateItemModal) } }}
            >
                <div className='col-12 list-cont d-flex flex-column my-3 p-0'>
                    {emptyCategories && (
                        <div className='empty-list'>Add some items!</div>
                    )}
                    {!listData.categories?.length ? (
                        null
                    ) : (
                        // CATEGORIES
                        listData.categories.map((category) => (
                            category.items.length ? (
                                <div key={category._id} id='category-cont'>
                                    <div className='d-flex justify-content-between align-items-center category-header-cont'>
                                        <div id='category-name-cont'>
                                            <h3 id='category-name'>{category.categoryName}</h3>
                                        </div>
                                        <img
                                            id='new-item-icon'
                                            alt='add item icon'
                                            src='/images/plus-icon-blue.png'
                                            onClick={() => { handleAddItemClick(category._id) }}
                                        >
                                        </img>
                                    </div>
                                    <hr></hr>
                                    {/* ADD ITEM TO EXISTING CATEGORY FORM */}
                                    {
                                        addToCategoryForm[category._id]?.formOpen && (
                                            <div className='add-item-cont'>
                                                <input id='new-item-input' name='itemName' onChange={handleAddItemToCategoryChange}></input>
                                                <button id='new-item-btn' onClick={() => { handleAddItemToCategory(category._id) }}>add!</button>
                                            </div>
                                        )
                                    }
                                    {/* ITEMS */}
                                    <div className='d-flex flex-column category-items-cont'>
                                        {category.items.map((item) => (
                                            < div key={item._id}>
                                                <div key={item._id} className='d-flex justify-content-between item-container'>
                                                    <p className='item-name' key={item._id}>{item.itemName}</p>
                                                    <div className='d-flex item-details'>
                                                        <p className='item-qty'>{item.quantity}</p>

                                                        {/* NOTES BUTTON */}

                                                        <img
                                                            className={item.notes ? 'notes-icon' : 'notes-icon-disabled'}
                                                            src='/images/notes-icon.png'
                                                            alt='notes icon'
                                                            onClick={() => setNotesObjState({ ...notesObjState, [item._id]: { notesOpen: !notesObjState[item._id].notesOpen } })}
                                                        >
                                                        </img>

                                                        {/* EDIT BUTTON */}
                                                        <img
                                                            className='edit-pencil'
                                                            src='/images/edit-pencil.png'
                                                            alt='edit icon'
                                                            onClick={() => {
                                                                setToggleUpdateItemModal(!toggleUpdateItemModal);
                                                                setItemForUpdate({ catId: category._id, itemId: item._id, itemName: item.itemName, quantity: item.quantity, notes: item.notes })
                                                            }}>
                                                        </img>

                                                        {/* DELETE BUTTON */}
                                                        <img
                                                            className='trash-can'
                                                            src='/images/trashCan.png'
                                                            alt='trash can icon'
                                                            onClick={() => { handleItemDelete(item._id, listId, category._id) }}>
                                                        </img>
                                                    </div>
                                                </div>
                                                {/* NOTES ELEMENT */}
                                                {notesObjState && notesObjState[item._id].notesOpen && item.notes && (
                                                    <div className='item-notes-container my-2'>
                                                        <div className='item-notes'>{item.notes}</div>
                                                    </div>

                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            ) : (
                                null
                            )

                        ))
                    )}



                </div>
            </div>

            {/* EDIT ITEM MODAL */}

            {toggleUpdateItemModal ? (
                <UpdateItemModal
                    listData={listData}
                    setListData={setListData}
                    toggleUpdateItemModal={toggleUpdateItemModal}
                    setToggleUpdateItemModal={setToggleUpdateItemModal}
                    item={itemForUpdate}
                >

                </UpdateItemModal>
            ) : (
                null
            )}

        </div>

    )
}

export default SingleList 