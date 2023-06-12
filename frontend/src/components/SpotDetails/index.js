import { useEffect, useState } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotThunk } from '../../store/spots'
import { loadAllReviewsForSpotThunk } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import ReviewCard from '../ReviewCard';
import OpenModalButton from '../OpenModalButton';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadSpotThunk(spotId)).then(() =>
            dispatch(loadAllReviewsForSpotThunk(spotId))
        ).catch(e => history.push('/404'));
    }, [dispatch]);

    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = Object.values(reviewsObj);

    const [showPostReviewModal, setShowPostReviewModal] = useState(false);
    useEffect(() => {
        let hasNotReviewed = true;
        for (const review of reviews) {
            if (review.userId === user?.id) hasNotReviewed = false;
        }
        if (user && user.id !== spot.ownerId && hasNotReviewed) setShowPostReviewModal(true);
        else setShowPostReviewModal(false);
    }, [user, reviews])

    // let previewImage = 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=250&h=250&dpr=1';
    // if (spot?.SpotImages) {
    //     for (const img of spot?.SpotImages) {
    //         if (img.preview) previewImage = img.url;
    //     };
    // }; // the timing for this is very off

    return (
        <div className='spot-details-card'>
            <div className='spot-details-card.header'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state ? spot.state + ', ' : null}{spot.country}</h3>
            </div>
            <div className='image-collage'>
                <img className='preview-image' src={spot?.SpotImages ? spot.SpotImages.filter(img => img.preview)[0]?.url : 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=250&h=250&dpr=1'} alt='primary image' />
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
                        <span><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{spot.avgStarRating.toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</span>
                    </div>
                    <button className='spot-details-card.reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className='spot-details-card.reviews'>
                <h2><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{spot.avgStarRating.toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</h2>
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
                {reviews.length
                        ?
                <div className='spot-details-card.reviews#index'>
                    {reviews.map(review => (review?.stars ? <ReviewCard review={review} user={user} spotid={spot.id} key={`review-${review.id}`} /> : null))}
                </div>
                    :
                    <>{showPostReviewModal ? (<h2 className='alt-text'>Be the first to post a review!</h2>) : (<h2 className='alt-text'>No reviews yet!</h2>)}</>
                }
            </div>
        </div>
    );
};

export default SpotDetails;
