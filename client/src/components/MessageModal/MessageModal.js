
import './messageModal.css';

const MessageModal = () => {


    return (
        <div className='d-flex align-items-center message-modal-cont'>
            <p id='message'>List Sent!</p>
            <img alt='list sent check icon' id='list-sent-check' src='./images/list-sent-check.png'></img>
        </div>
    )
}

export default MessageModal;