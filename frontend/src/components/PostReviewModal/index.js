import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import StarRatingInput from './StarRatingInput';
import './PostReviewModal.css';
import { loadSpotThunk } from '../../store/spots';


function PostReviewModal({spotid, user}){
    const { closeModal } = useModal();
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
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

        try {
            await dispatch(createReviewThunk(submission));
            closeModal();
            await dispatch(loadSpotThunk(spotid)); // this isn't how you trigger the re-render, but time is short
        } catch(e) {
            const errors = await e.json();
            setErrors({message: errors.message});
        }
    };

    return (
        <div className='post-review-modal-interior'>
            <h1>How was your stay?</h1>
            <form id='prf' onSubmit={handleSubmit}>
                <p className='rm-er'>{errors.message}</p>
                <textarea
                    form='prf'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <StarRatingInput stars={stars} onChange={number => setStars(parseInt(number))} />
                <button type='submit' disabled={disabled}>Submit your review</button>
            </form>
        </div>
    );
};

export default PostReviewModal;
