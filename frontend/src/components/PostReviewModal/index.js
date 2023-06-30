import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import StarRatingInput from './StarRatingInput';
import './PostReviewModal.css';


function PostReviewModal({spotid, user}){
    const { closeModal } = useModal();
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setErrors(errors);
    }, [errors]);

    useEffect(() => {
        if (review.length < 10 || !(Number(stars) > 0)) setDisabled(true);
        else setDisabled(false);
    }, [review, stars]);

    const handleSubmit = async e => {
        e.preventDefault();
        const submission = {
            review,
            stars,
            spotid,
            user
        };

        dispatch(createReviewThunk(submission)).then(closeModal()).catch(e => e.json()).then(errors => setErrors({message: errors.message}));
    };

    return (
        <div className='modal-interior' id='post-review-modal-interior'>
            <h1>How was your stay?</h1>
            <form id='prf' onSubmit={handleSubmit}>
                <p className='error' id='rm-er'>{errors.message}</p>
                <textarea
                    id='prf-ta'
                    form='prf'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <div id='star-input-div'>
                    <StarRatingInput stars={stars} onChange={number => setStars(parseInt(number))} /> Stars
                </div>
                <button className='primary-button' id='prf-b' type='submit' disabled={disabled}>Submit your review</button>
            </form>
        </div>
    );
};

export default PostReviewModal;
