import Auth from '../../../utils/Auth';
import './profileModal.css';

const ProfileModal = () => {

    return (
        <div className='d-flex justify-content-end align-items-center profile-modal-cont'>
            <p id='logout' onClick={() => {Auth.logout();}}>logout</p>
        </div>
    )
}

export default ProfileModal;