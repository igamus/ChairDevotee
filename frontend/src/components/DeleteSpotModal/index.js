import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { loadSpotThunk, removeSpotThunk } from '../../store/spots';
import './DeleteSpotModal.css';

function DeleteSpotModal({spotid}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const yesClick = e => {
        e.preventDefault();
        dispatch(removeSpotThunk(spotid)).then(dispatch(loadSpotThunk(spotid))).then(closeModal);
    };

    return (
        <div className='modal-interior' id="delete-spot-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className='primary-button' id='dyb' onClick={yesClick}>Yes (Delete Spot)</button>
            <button className='secondary-button' id='dnb' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal;
