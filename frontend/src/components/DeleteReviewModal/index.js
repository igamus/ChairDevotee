import './DeleteReviewModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';

function DeleteReviewModal({reviewid, spotid}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const yesClick = e => {
        e.preventDefault();
        dispatch(deleteReviewThunk(reviewid)).then(closeModal).catch(alert('Problem deleting review.'));
    };

    return (
        <div className='modal-interior' id='delete-review-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button className='primary-button' id='dyb' onClick={yesClick}>Yes (Delete Review)</button>
            <button className='secondary-button' id='dnb' onClick={closeModal}>No (Keep Review)</button>
        </div>
    );
};

export default DeleteReviewModal;
