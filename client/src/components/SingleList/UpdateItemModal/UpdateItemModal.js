import React, { useState, useEffect } from 'react';
import { updateItem } from '../../../utils/api';
import './updateItemModal.css';

const UpdateItemModal = ({ item, toggleUpdateItemModal, setToggleUpdateItemModal, setListData }) => {

    // HOOKS
    const [itemFormData, setItemFormData] = useState(item)

    const catId = item.catId;
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setItemFormData({ ...itemFormData, [name]: value });
        console.log('handle change', itemFormData)
    }

    const handleEditItem = async (e) => {
        console.log('whats the item', itemFormData)
        e.preventDefault();

        let editBody = {...itemFormData, itemId: item.itemId}

        const response = await updateItem(catId, editBody);
        const updatedItem = await response.json();

        setItemFormData(updatedItem);
        setListData(updatedItem)
        setToggleUpdateItemModal(!toggleUpdateItemModal);

    }

    return (
        <div className='modal-cont'>
            <form
                id='edit-item-form'
                onSubmit={handleEditItem}
            >
                <div className='d-flex justify-content-center my-2'>
                    <input
                        className='mx-3 custom-input'
                        defaultValue={item.itemName}
                        name='itemName'
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-center my-2'>
                    <textarea
                        className='mx-3 custom-input'
                        defaultValue={item.notes}
                        name='notes'
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-around mt-3'>
                    {/* QUANTITY BUTTONS */}
                    <div className='d-flex'>
                        <div 
                            className='dec-button'
                            onClick={() => {
                                if (item.quantity === 1) {
                                    return;
                                }
                                setItemFormData({ ...itemFormData, quantity: itemFormData.quantity -1 })
                                console.log(itemFormData)
                             
                            }}
                        >
                            -
                        </div>
                        <div className='item-qty'>{itemFormData.quantity}</div>
                        <div 
                            className='inc-button'
                            onClick={() => {
                                setItemFormData({ ...itemFormData, quantity: itemFormData.quantity +1 })
                                console.log(itemFormData)
                             
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

export default UpdateItemModal;