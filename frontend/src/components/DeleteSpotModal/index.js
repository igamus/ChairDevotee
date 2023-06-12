import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { removeSpotThunk } from '../../store/spots';
import './DeleteSpotModal.css';

function DeleteSpotModal({spotid}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const yesClick = e => {
        e.preventDefault();
        dispatch(removeSpotThunk(spotid)).then(closeModal);
    };

    return (
        <div className="delete-spot-modal-interior">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className='dyb' onClick={yesClick}>Yes (Delete Spot)</button>
            <button className='dnb' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal;
