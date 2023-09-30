import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import { getReceivedLists } from '../../utils/api';
import { formatDate } from '../../utils/helpers';
import './shareListIndex.css';


const ShareListIndex = () => {

    const [receivedListData, setReceivedListData] = useState({});
    const userId = Auth.getProfile().data?._id;

    const receivedListDataLength = Object.keys(receivedListData).length

    useEffect(() => {
        const findReceivedLists = async () => {
            const response = await getReceivedLists(userId);
            const receivedLists = await response.json();
            setReceivedListData(receivedLists.receivedLists)
            console.log(receivedListData);
        }
        findReceivedLists();
    }, [receivedListDataLength])

    return (
        <div className='container-fluid'>
            {/* HEADER */}
            <div className='row'>
                <div className='col-12 d-flex lists-header justify-content-between align-items-center'>
                    <h3 className='list-title'>Received Lists</h3>
                    <button className='new-list-btn' >+</button>
                </div>
            </div>
            {/* LISTS */}
            <div className='list-wrapper'>
                <div className='col-12 btn-container'>
                    {receivedListData.length && receivedListData.map((list) => (
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
                                <div className=''>
                                <p className='sent-by-label'>sent by:</p>
                                <p className='sent-by list-info'>{list.sentBy}</p>
                                </div>
                                {/* <p className='list-info date'>{formatDate(list.dateCreated)}</p> */}
                                {/* SAVE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/save-icon2.png'
                                    alt='trash can icon'
                                    // onClick={() => {handleListDelete(list._id)}}
                                >
                                </img>
                                {/* DELETE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/trashCan.png'
                                    alt='trash can icon'
                                    // onClick={() => {handleListDelete(list._id)}}
                                >
                                </img>
                            </div>

                            <hr></hr>
                        </div>

                    ))}
                </div>

            </div>
        </div>
    )
};

export default ShareListIndex;