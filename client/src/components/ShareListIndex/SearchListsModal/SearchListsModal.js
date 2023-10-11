import { useState } from 'react'
import { formatDate } from '../../../utils/helpers';
import { sendList } from '../../../utils/api';
import './searchListModal.css';

const SearchListsModal = ({ lists, recipientId, findUserStatus, username, setReceivedListData, setFindListModal, setSendListForm }) => {
    const [sendListData, setSendListData] = useState({});
    const [listToSendId, setListToSendId] = useState();

    const handleListClick = async (list) => {
        const keys = Object.keys(list);
        if (keys.includes('categories')) {
            setSendListData({listId: list._id, recipientId, sentBy: username, typeOfList: 'shoppingList'});
        } else {
            setSendListData({listId: list._id, recipientId, sentBy: username, typeOfList: 'checklist'});
        }
        setListToSendId(list._id)
    }

    const handleSendList = async () => {
        const response = await sendList(sendListData);
        const receivedLists = await response.json();
        setReceivedListData(receivedLists);
        setFindListModal(false);
        setSendListForm(false);
    }

    return (
        <div className='search-lists-modal-cont'>
            {lists.length && lists.map((list) => (
                <div key={list._id} className={listToSendId === list._id ? 'list-clicked' : ''}>
                    <div
                        className='list-to-send-cont'
                        onClick={() => {handleListClick(list)}}
                    >
                        <div className='search-list-btn-cont'>
                            <button
                                className='list-btn'
                            >
                                {list.listTitle}
                            </button>
                        </div>
                        <div className='search-lists-date-cont'>
                            <p className='list-info date'>{formatDate(list.dateCreated)}</p>
                        </div>
                        {findUserStatus && listToSendId === list._id && (
                            <button id='send-list-button' onClick={() => {handleSendList()}}>Send</button>
                        )}
                    </div>
                    <hr className='hr'></hr>
                </div>
            ))}
        </div>
    )
}

export default SearchListsModal;