import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import { getReceivedLists, searchForRecipient, saveReceivedList, deleteReceivedList, getListsToSend, } from '../../utils/api';
import SearchListsModal from './SearchListsModal/SearchListsModal';
import MessageModal from '../MessageModal/MessageModal';
import { useReceivedListsContext } from '../../utils/GlobalState';
import './shareListIndex.css';


const ShareListIndex = () => {
    const {receivedLists, setReceivedLists} = useReceivedListsContext();

    const [receivedListData, setReceivedListData] = useState({});
    const [listData, setListData] = useState();
    const [sendListForm, setSendListForm] = useState(false);
    const [recipientData, setRecipientData] = useState({});
    const [findUserStatus, setFindUserStatus] = useState();
    const [searchForUserMessage, setSearchForUserMessage] = useState();
    const [findlistModal, setFindListModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState('');

    const userId = Auth.getProfile().data?._id;
    const username = Auth.getProfile().data?.username

    const receivedListDataLength = Object.keys(receivedListData).length

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setRecipientData({ ...recipientData, [name]: value })
    }

    const handleSearchForRecipient = async () => {
        if (!recipientData.username) {
            return;
        }
        if (recipientData.username === username) {
            setFindUserStatus(false);
            setSearchForUserMessage('cannot send list to self')
            return
        }
        const response = await searchForRecipient(recipientData.username);
        const recipient = await response.json();
        if (recipient.length) {
            setFindUserStatus(true);
            setRecipientData({ ...recipientData, recipientId: recipient[0]._id })
            setSearchForUserMessage('found user!')
        } else {
            setFindUserStatus(false);
            setSearchForUserMessage('no user with that name');
        }
    }

    const handleSearchForListsClick = async () => {
        if (!findUserStatus) {
            return;
        }
        const response = await getListsToSend(userId);
        const lists = await response.json();
        setListData(lists);
        setFindListModal(!findlistModal);
    }

    const handleSaveReceivedList = async (receivedList) => {
        let typeOfList = null;
        const keys = Object.keys(receivedList);
        keys.includes('categories') ? typeOfList = 'shoppingList' : typeOfList = 'checklist';

        const response = await saveReceivedList(userId, receivedList._id, typeOfList);
        const receivedLists = await response.json();
        setReceivedListData(receivedLists);
        setMessage('List Saved!')
        setMessageModal(true);
        hideMessageModal();
    }

    const handleDeleteReceivedList = async (receivedList) => {
        let typeOfList = null;
        const keys = Object.keys(receivedList);
        keys.includes('categories') ? typeOfList = 'shoppingList' : typeOfList = 'checklist';
        console.log('TOL', typeOfList);

        const response = await deleteReceivedList(userId, receivedList._id, typeOfList);
        const receivedLists = await response.json();
        setReceivedListData(receivedLists);
    }

    const hideMessageModal = () => {
        let hideMessage = setTimeout(() => {
            setMessageModal(false);
            clearTimeout(hideMessage);
        }, 1000)
    }

    useEffect(() => {
        const findReceivedLists = async () => {
            const response = await getReceivedLists(userId);
            const receivedLists = await response.json();
            const allReceivedLists = receivedLists.receivedLists.concat(receivedLists.receivedChecklists)
            setReceivedListData(allReceivedLists);
            setReceivedLists(allReceivedLists);
        }
        findReceivedLists();
    }, [receivedListDataLength])

    return (
        <div className='container-fluid'>
            {/* HEADER */}
            <div className='row sticky'>
                <div className='col-12 d-flex lists-header justify-content-between align-items-center'>
                    <h3 className='list-title'>Received Lists</h3>
                    <button
                        className='new-list-btn'
                        id='send-list-form-button'
                        onClick={() => {
                            if (findlistModal) {
                                setFindListModal(false);
                            }
                            setSendListForm(!sendListForm);
                            setSearchForUserMessage('');
                            setFindUserStatus('');
                            setRecipientData({})
                        }}
                    >
                        <img alt='send list icon' src='/images/send-list-icon.png' id='send-list-icon'></img>
                    </button>
                </div>
            {/* SEND LIST FORM */}
            {sendListForm && (
                <div className='row'>
                    <div className='col-12 d-flex justify-content-between align-items-center send-list-form'>
                        <div className='recipient-section'>
                            <div className='send-to-cont'>
                                <p id='send-to'>Send to:</p>
                            </div>
                            <input name='username' id='send-to-input' placeholder='Search' onChange={handleFormChange}></input>
                            {/* SEARCH RECIPIENTS BUTTON */}
                            <button
                                className='search-for-recipient-button'
                                onClick={() => { handleSearchForRecipient(recipientData.username) }}
                            >
                                <img alt='search icon' id='search-icon' src='/images/search-icon.png'></img>
                            </button>
                            <div className='search-for-user-message-cont'>
                                <p className={findUserStatus ? ('foundUser') : ('noUser')}>{searchForUserMessage}</p>
                            </div>
                        </div>
                        <div className='list-section'>
                            {/* SEARCH LISTS BUTTON */}
                            <button id={findUserStatus ? 'find-list-button' : 'find-list-button-deactivated'} onClick={() => { handleSearchForListsClick() }}>
                                <img alt='find-list-icon' id='find-list-icon' src='/images/find-list-icon.png'></img>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
            {/* LISTS */}
            <div className='lists-wrapper'>
                <div className='col-12 btn-container'>
                    {!receivedListData.length && (
                        <div className='empty-list'>No Received Lists!</div>
                    )}
                    {(receivedListData.length > 0) && receivedListData.map((list) => (
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
                                {/* SAVE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/save-icon2.png'
                                    alt='trash can icon'
                                    onClick={() => { handleSaveReceivedList(list) }}
                                >
                                </img>
                                {/* DELETE BUTTON */}
                                <img
                                    className='trash-can'
                                    src='/images/trashCan.png'
                                    alt='trash can icon'
                                    onClick={() => { handleDeleteReceivedList(list) }}
                                >
                                </img>
                            </div>

                            <hr></hr>
                        </div>

                    ))}
                </div>

            </div>
            {findlistModal && (
                <SearchListsModal
                    lists={listData}
                    recipientId={recipientData.recipientId}
                    findUserStatus={findUserStatus}
                    username={username}
                    setReceivedListData={setReceivedListData}
                    setFindListModal={setFindListModal}
                    setSendListForm={setSendListForm}
                    setMessageModal={setMessageModal}
                    setMessage={setMessage}
                />
            )}
            {messageModal && (
                <MessageModal message={message} />
            )}
        </div>
    )
};

export default ShareListIndex;