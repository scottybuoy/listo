import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleList, deleteItem, addItem, addItemWithCategory, getListCategories } from "../../utils/api";
import './singleList.css';
import UpdateItemModal from './UpdateItemModal/UpdateItemModal';
import allCategories from './CategoryMenu/CategoryMenu';


const SingleList = () => {

    // HOOKS
    const { listId } = useParams();
    const [listData, setListData] = useState({});
    const [notesObjState, setNotesObjState] = useState({})
    const [newItemForm, setNewItemForm] = useState(false);
    const [newItemData, setNewItemData] = useState()
    const [toggleUpdateItemModal, setToggleUpdateItemModal] = useState(false);
    const [itemForUpdate, setItemForUpdate] = useState({});

    const listDataLength = Object.keys(listData).length;

    // toggle notesOpen field in notesObjState state variable;
    const logNotes = (item) => {
        // console.log('before update', notesObjState)
        setNotesObjState({ ...notesObjState, [item]: { notesOpen: !notesObjState[item].notesOpen } })
        // console.log('state object', notesObjState);
    }

    const handleItemDelete = async (itemId, listId, categoryId) => {
        const response = await deleteItem(itemId, listId, categoryId);
        const updatedList = await response.json();
        setListData(updatedList);

    }

    const handleAddItem = async () => {
        const response = await addItem(listId, newItemData);
        const newItem = await response.json();
        setListData(newItem);
        setNewItemForm(!newItemForm);
    }

    const handleAddItemWithCategory = async () => {
        const response = await addItemWithCategory(listId, newItemData);
        const newItem = await response.json();
        console.log('NEW ITEM', newItem);
        setListData(newItem);
        setNewItemForm(!newItemForm);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!e.target.value) {
            console.log('must enter item name')
            return
        }
        setNewItemData({ ...newItemData, [name]: value });
        console.log('HANDLE CHANGE', newItemData);
    }

    // const closeModal = (e) => {
    //     console.log('parent el', e.target.parentElement.className);
    //     // if (!e.target.matches('.modal-cont')) {
    //     //     setToggleUpdateItemModal(false);
    //     // }
    // }

    useEffect(() => {

        console.log('hey');

        // const findList = async () => {
        //     const response = await getSingleList(userId, listId)
        //     const list = await response.json();
        //     setListData(list);

        // }

        const findCategories = async () => {
            const response = await getListCategories(listId);
            const categories = await response.json();
            setListData(categories);
            console.log('find cats', listDataLength, listData);
        }

        const createNotesObj = (listData) => {

            if (!listData.items) {

                return;
            }

            let notesObj = {};

            for (let i = 0; i < listData.items.length; i++) {
                notesObj[listData.items[i].itemName] = { notesOpen: false }
            }


            setNotesObjState(notesObj)

        }

        // findList();
        findCategories();
        createNotesObj(listData);

    }, [listDataLength]);

    // console.log(notesObjState)
    return (

        // HEADER

        <div
            className='container-fluid'
        // onClick={closeModal}
        >
            <div className='row'>
                <div className='col-12 list-title-cont d-flex justify-content-between align-items-center'>
                    <h3 className='list-title'>{listData.listTitle}</h3>
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
                    <div className='col-12 d-flex align-items-center justify-content-between new-item-form'>
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
            {/* og containter */}
            {/* <div className='row'>
                <div className='col-12 list-cont d-flex flex-column align-items-center my-3'> */}
            <div className='row d-flex justify-content-center'>
                <div className='col-12 list-cont d-flex flex-column my-3'>

                    {!listData.categories ? (
                        <div>fetching list!</div>
                    ) : (
                        
                        listData.categories.map((category) => (
                            category.items.length? (
                                <div key={category._id} id='category-cont'>
                                <h3 id='category-name'>{category.categoryName}</h3>
                                <hr></hr>
                                <div className='d-flex flex-column category-items-cont'>
                                    {category.items.map((item) =>
                                        <div key={item._id} className='d-flex justify-content-between'>
                                            <p key={item._id}>{item.itemName}</p>
                                            <div className='d-flex item-details'>
                                                <p className='item-qty'>{item.quantity ? item.quantity : 1}</p>
                                                <button key={item._id} value={item.itemName} onClick={() => logNotes(item.itemName)} className='notes-btn'>notes</button>

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
                                    )}
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