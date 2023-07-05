import ReviewCard from '../ReviewCard';
import './ManageReviews.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllReviewsForUserThunk } from '../../store/reviews';

function ManageReviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.user.orderedList);
    const [areReviewsLoaded, setAreReviewsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadAllReviewsForUserThunk()).then(() => setAreReviewsLoaded(true));
    }, [dispatch]); // reviews in dependency array?

    return areReviewsLoaded && (
        <div id='manage-reviews'>
            <h1>Manage Reviews</h1>
            <div id='spot-details-card-reviews-index'>
                {reviews.map(review => (review?.stars ? <ReviewCard review={review} key={`review-${review.id}`} source='user' /> : null))}
            </div>
        </div>
    );
}

export default ManageReviews;
