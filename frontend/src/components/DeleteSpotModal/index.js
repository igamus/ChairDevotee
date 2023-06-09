import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { removeSpotThunk } from '../../store/spots';
import './DeleteSpotModal.css';

function DeleteSpotModal({spotid}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const yesClick = e => {
        e.preventDefault();
        dispatch(removeSpotThunk(spotid)).then(closeModal); // should just refresh after state updates, but it's not doing so and not removing the old spot... // ... maybe with a useEffect hook? // tryin to force a refresh doesn't work either...
    };

    return (
        <div className="delete-spot-modal-interior">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={yesClick}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal;
