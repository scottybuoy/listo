import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateItem } from '../../../utils/api';
import './updateItemModal.css';

const UpdateItemModal = ({ item }) => {
    console.log('ITEM in modal', item)

    if (!item.quantity) {
        item.quantity = 1;
    }

    // HOOKS
    const [itemFormData, setItemFormData] = useState()
    const { listId } = useParams();

    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setItemFormData({ ...itemFormData, [name]: value });
        console.log('handle change', itemFormData)
    }

    const handleEditItem = async (e) => {
        console.log('whats the item', itemFormData)
        e.preventDefault();

        let editBody = {...itemFormData, itemId: item.itemId}

        const response = await updateItem(listId, editBody);
        const updatedItem = await response.json();

        setItemFormData(updatedItem);

    }

    useEffect(() => {

        setItemFormData(item)

    },[])

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
                    <div className='d-flex'>
                        <div 
                            className='dec-button'
                            onClick={() => {
                                setItemFormData({ ...itemFormData, quantity: item.quantity-- })
                                console.log(itemFormData)
                             
                            }}
                        >
                            -
                        </div>
                        <div className='item-qty'>{item.quantity}</div>
                        <div 
                            className='inc-button'
                            onClick={() => {
                                setItemFormData({ ...itemFormData, quantity: item.quantity++ })
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