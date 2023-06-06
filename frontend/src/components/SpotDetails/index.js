import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotThunk } from '../../store/spots'
import { loadAllReviewsForSpotThunk } from '../../store/reviews';
import ReviewCard from '../ReviewCard';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSpotThunk(spotId));
        dispatch(loadAllReviewsForSpotThunk(spotId));
    }, [dispatch])

    const spot = useSelector(state => state.spots.singleSpot)
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = Object.values(reviewsObj);

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
                        <span>{spot.avgStarRating ? <span><i className='fa-solid fa-star' /> {spot.avgStarRating} | {spot.numReviews} {spot.numReviews > 1 ? 'reviews' :'review'}</span> : 'Be the first to review!'}</span>
                    </div>
                    <button className='spot-details-card.reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className='spot-details-card.reviews'>
                <h2>{spot.avgStarRating ? <span><i className='fa-solid fa-star' /> {spot.avgStarRating} | {spot.numReviews} {spot.numReviews > 1 ? 'reviews' :'review'}</span> : 'Be the first to review!'}</h2>
                {reviews.map(review => ( <ReviewCard review={review} />))}
            </div>
        </div>
    );
};

export default SpotDetails;
