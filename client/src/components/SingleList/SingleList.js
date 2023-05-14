import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleList, deleteItem } from "../../utils/api";
import './singleList.css';


const SingleList = () => {
    const { userId, listId } = useParams();
    const [listData, setListData] = useState({});
    const [notesObjState, setNotesObjState] = useState({})

    const listDataLength = Object.keys(listData).length;

    // toggle notesOpen field in notesObjState state variable
    const logNotes = (item) => {
       console.log('before update', notesObjState)
        setNotesObjState({...notesObjState, [item]: {notesOpen: !notesObjState[item.notesOpen]}})
        console.log('state object', notesObjState);
    }

    const handleItemDelete = async (itemId, listId) => {
        console.log('item id for deletion', itemId)
        const response = await deleteItem(itemId, listId);
        const updatedList = await response.json();
        setListData(updatedList);

    }

    useEffect(() => {
        
        const findList = async () => {
            const response = await getSingleList(userId, listId)
            const list = await response.json();
            setListData(list);

        }

        const createNotesObj = (listData) => {

            if(!listData.items) {
            
                return;
            }
    
            let notesObj = {};
           
            for(let i = 0; i < listData.items.length; i++) {
                notesObj[listData.items[i].itemName] = {notesOpen: false}
            }
    
            
            setNotesObjState(notesObj)
    
        }

        findList();
        createNotesObj(listData);

    }, [listDataLength]);
    
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12 list-title-cont'>
                    <h3 className='list-title'>{listData.listTitle}</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 list-cont d-flex flex-column align-items-center my-5 '>
               
                    {!listData.items ? (
                        <div>fetching list!</div>
                    ) : (
                        listData.items.map((item) => (
                            
                            <div key={item._id} className='col-12 col-md-8 col-lg-6 d-flex justify-content-between'>
                                <p className='list-item'>{item.itemName}</p>
                                <div className='d-flex item-details'>
                                    <p className='item-qty'>{item.quantity ? item.quantity : 1}</p>
                                    <button key={item._id} value={item.itemName} onClick={() => logNotes(item.itemName)} className='notes-btn'>notes</button>
                                    <img 
                                        className='trash-can' 
                                        src='/images/trashCan.png' 
                                        alt='trash can icon' 
                                        onClick={() => { handleItemDelete(item._id, listId) }}>
                                    </img>
                                </div>
                                
                                {/* {!notesObjState[item.itemName].notesOpen ? (
                                    <div>{item.notes}</div>
                                ) : (
                                    null
                                )} */}
                            </div>
                            
                        ))
                    )}
                        
                    
                    
                </div>
            </div>
            
        </div>
        
    )
}

export default SingleList