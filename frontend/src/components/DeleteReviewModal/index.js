import './DeleteReviewModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';

function DeleteReviewModal({reviewid}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const yesClick = e => {
        e.preventDefault();
        dispatch(deleteReviewThunk(reviewid)).then(closeModal);
    };

    return (
        <div className='delete-review-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={yesClick}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    );
};

export default DeleteReviewModal;
