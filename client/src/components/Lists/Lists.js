import React from 'react';
import { Link } from 'react-router-dom';
import './lists.css'

const Lists = ({ lists, userId }) => {
    console.log('why so many', userId)
    return (
        <div className='d-flex justify-content-center my-5'>
            <div className='btn-container'>
                {lists.map((list) => (

                    <Link
                        key={list._id}
                        className='link'
                        to={`/${userId}/list/${list._id}`}
                    >
                        <button className='list-btn' key={list._id}>
                            {list.listTitle}
                        </button>
                    </ Link>


                ))}
            </div>

        </div>
    )
}

export default Lists;