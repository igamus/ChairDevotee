import './DeleteModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import { deleteBookingThunk } from '../../store/bookings';

function DeleteModal({ type, reviewid, bookingId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const yesClick = e => {
        e.preventDefault();
        if (type === 'review') dispatch(deleteReviewThunk(reviewid)).then(closeModal).catch(() => alert('Problem deleting review.'));
        if (type === 'booking') dispatch(deleteBookingThunk(bookingId)).then(closeModal).catch(() => alert('Problem deleting booking.'));
    };

    return (
        <div className='modal-interior' id='delete-review-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this {type === 'review' ? 'review' : 'booking'}?</p>
            <button className='primary-button' id='dyb' onClick={yesClick}>Yes (Delete {type === 'review' ? 'review' : 'booking'})</button>
            <button className='secondary-button' id='dnb' onClick={closeModal}>No (Keep {type === 'review' ? 'review' : 'booking'})</button>
        </div>
    );
};

export default DeleteModal;
