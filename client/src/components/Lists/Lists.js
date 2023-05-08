import React from 'react';
import './lists.css'

const Lists = ({lists, test}) => {
 
    return (
        <div className='d-flex justify-content-center my-5'>
            <div className='btn-container'>
            {lists.map((list) => (
                
                <button className='list-btn' key={list._id}>
                    {list.listTitle}
                </button>
         
        ))}
            </div>
            
        </div>
    )
}

export default Lists;