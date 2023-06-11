import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotThunk } from '../../store/spots'
import { loadAllReviewsForSpotThunk } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import ReviewCard from '../ReviewCard';
import OpenModalButton from '../OpenModalButton';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSpotThunk(spotId));
        dispatch(loadAllReviewsForSpotThunk(spotId));
    }, [dispatch])

    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = Object.values(reviewsObj);

    // logic not working right on showing the button & posting results in error throw for new cards, etc. (though it didn't in create spot...)
    const [showPostReviewModal, setShowPostReviewModal] = useState(true);


    // useEffect(() => {
    //     for (const review of reviews) {
    //         console.log(`${review.id}:`, review);
    //         if (review.userId === user?.id) setShowPostReviewModal(false);
    //     }
    // }, [reviews]);

    // useEffect(() => {
    //     if (!user) setShowPostReviewModal(false)
    //     else if (user && user?.id !== spot.ownerId) setShowPostReviewModal(true)
    // }, [user]);

    return (
        <div className='spot-details-card'>
            <div className='spot-details-card.header'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state ? spot.state + ', ' : null}{spot.country}</h3>
            </div>
            <div className='image-collage'>
                <img className='preview-image' src={spot.SpotImages ? spot.SpotImages[0].url : ''} alt='primary image' />
                {/* for 4 images of the rest of the images, you want that one... */}
            </div>
            <div className='spot-details-card.about'>
                <div className='spot-details-card.about#blurb'>
                    <h2>Hosted by {spot.Owner ? <span>{spot.Owner.firstName} {spot.Owner.lastName}</span> : null}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='spot-details-card.about#card'>
                    <div className='spot-details-card.about#card-data'>
                        <span>${spot.price}</span>
                        <span><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{spot.avgStarRating} | {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</span>
                    </div>
                    <button className='spot-details-card.reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className='spot-details-card.reviews'>
                <h2><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{spot.avgStarRating} | {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</h2>
                <div className='spot-details-car.reviews#button-parent'>
                    {showPostReviewModal
                        ?
                    <OpenModalButton
                        modalComponent={<PostReviewModal spotid={spot.id} user={user} />}
                        buttonText={'Post Your Review'}
                    />
                        :
                    null}
                </div>
                <div className='spot-details-card.reviews#index'>
                    {reviews.map(review => (review?.stars ? <ReviewCard review={review} key={`review-${review.id}`} /> : null))}
                </div>
            </div>
        </div>
    );
};

export default SpotDetails;
