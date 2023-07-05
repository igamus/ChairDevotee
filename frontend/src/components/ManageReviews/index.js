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
    }, [dispatch]); // reviews?

    return areReviewsLoaded && (
        <div id='manage-reviews'>
            <h1>Manage Reviews</h1>
            <p>
                List of reviews created by the user.
                Can ping `/api/reviews/current` to GET all reviews of current user.
                reviews: obj
                    user: obj
                        all data normalized
                    orderedList: arr
            </p>
            <div>
                {reviews?.map(review => (
                    <h2>{review.Spot.name}</h2>
                ))} {/* Deal with Review card and change the way it works between review from spot perspective and review from user perspective */}
            </div>
        </div>
    );
}

export default ManageReviews;
