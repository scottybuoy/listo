import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import './lists.css'

const Lists = ({ lists, userId }) => {
    console.log('why so many', userId)
    return (
        <>
        <div className='d-flex justify-content-end mx-3'>
            <Link
                className='link'
                to={`/${userId}/newList`}
            >
                <button className='new-list-btn'>+</button>
            </Link>
            
        </div>
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