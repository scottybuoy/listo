import React, {useState, useParams} from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import { newList } from '../../utils/api';
import { listCategories } from './listCategories';
import './lists.css'

const Lists = ({ lists, userId }) => {
    
    const [newListForm, setNewListForm] = useState(false);
    const [newListFormData, setNewListFormData] = useState({listType: 'Grocery'});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewListFormData({...newListFormData, [name]: value})
        console.log(newListFormData);
    }

    const handleFormSubmit = async () => {
        console.log(userId, newListFormData)
        newList(userId, newListFormData);
        
        
    }

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
                <button className='new-list-btn mx-4 my-4' onClick={() => setNewListForm(!newListForm)}>+</button> 
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
                <button id='new-list-btn' onClick={handleFormSubmit}>add!</button>
            </div>
        </div>
        )}

        <div className='d-flex justify-content-center my-5'>
            <div className='col-12 btn-container'>
                {lists.map((list) => (
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
                    </div>
                    


                ))}
            </div>

        </div>
        </>
    )
}

export default Lists;