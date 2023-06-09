import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import './PostReviewModal.css';


function PostReviewModal({spotid}){
    const { closeModal } = useModal();
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const dispatch = useDispatch();

    // error updating/handling... ?
    useEffect(() => {
        setErrors(errors);
        console.log(errors);
    }, [errors]);

    useEffect(() => {
        if (review.length < 10 || !(Number(stars) > 0)) setDisabled(true);
        else setDisabled(false);
    }, [review, stars])

    // fn to handle post
    const handleSubmit = async e => {
        e.preventDefault();
        const submission = {
            review,
            stars,
            spotid
        };

        try {
            // push to backend
            await dispatch(createReviewThunk(submission));
            closeModal();
        } catch(e) {
            const errors = await e.json();
            setErrors({message: errors.message});
        }
    };

    return (
        <div className='post-review-modal-interior'>
            <h1>How was your stay?</h1>
            <form id='prf' onSubmit={handleSubmit}>
                <p className='rm-er'>{errors.message} {/* Backend errors */}</p>
                <textarea
                    form='prf'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <span>
                    <input
                        placeholder='star-placeholder'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                    /> Stars
                </span>
                <button type='submit' disabled={disabled}>Submit your review</button>
            </form>
        </div>
    );
};

export default PostReviewModal;
