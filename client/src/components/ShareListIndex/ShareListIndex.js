import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import { getReceivedLists, searchForRecipient, getUserLists } from '../../utils/api';
import SearchListsModal from './SearchListsModal/SearchListsModal';
import { formatDate } from '../../utils/helpers';
import './shareListIndex.css';


const ShareListIndex = () => {

    const [receivedListData, setReceivedListData] = useState({});
    const [listData, setListData] = useState();
    const [sendListForm, setSendListForm] = useState(false);
    const [recipientData, setRecipientData] = useState({});
    const [findUserStatus, setFindUserStatus] = useState();
    const [searchForUserMessage, setSearchForUserMessage] = useState();
    const [findlistModal, setFindListModal] = useState(false);

    const userId = Auth.getProfile().data?._id;

    const receivedListDataLength = Object.keys(receivedListData).length

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setRecipientData({ ...recipientData, [name]: value })
    }

    const handleSearchForRecipient = async () => {
        if (!recipientData.username) {
            return;
        }
        const response = await searchForRecipient(recipientData.username);
        const recipient = await response.json();
        // recipient.length ? setSearchForUserMessage('found user!') : setSearchForUserMessage('no user with that name')
        if (recipient.length) {
            setFindUserStatus(true);
            setSearchForUserMessage('found user!')
        } else {
            setFindUserStatus(false);
            setSearchForUserMessage('no user with that name');
        }
        console.log(recipient);
    }

    const handleSearchForListsClick = async () => {
        const response = await getUserLists(userId);
        const lists = await response.json();
        // console.log('LISTS', lists);
        setListData(lists);
        setFindListModal(true);
    }

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
                    <button
                        className='new-list-btn'
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
                        +
                    </button>
                </div>
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
                            <button id='find-list-button' onClick={() => { handleSearchForListsClick()}}>
                                <img alt='find-list-icon' id='find-list-icon' src='/images/find-list-icon.png'></img>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* LISTS */}
            <div className='lists-wrapper'>
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
            {findlistModal && (
                <SearchListsModal lists={listData} />
            )}
        </div>
    )
};

export default ShareListIndex;