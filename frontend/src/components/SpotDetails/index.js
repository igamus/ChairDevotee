import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotThunk } from '../../store/spots'
import { loadAllReviewsForSpotThunk } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import ReviewCard from '../ReviewCard';
import OpenModalButton from '../OpenModalButton';
import './SpotDetails.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot.orderedList);

    const [isSpotLoaded, setIsSpotLoaded] = useState(false);
    const [areReviewsLoaded, setAreReviewsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadSpotThunk(spotId)).then(() => setIsSpotLoaded(true)).catch((e) => history.push('/404'));
    }, [dispatch, reviews]);

    useEffect(() => {
        dispatch(loadAllReviewsForSpotThunk(spotId)).then(() => setAreReviewsLoaded(true)).catch(() => {});
    }, [dispatch]);

    const [showPostReviewModal, setShowPostReviewModal] = useState(null);
    useEffect(() => {
        let hasNotReviewed = true;
        if (areReviewsLoaded) {
            if (reviews) {
                for (const review of reviews) {
                    if (review?.userId === user?.id) hasNotReviewed = false;
                }
            }
            if (user && (user.id !== spot.ownerId) && hasNotReviewed) setShowPostReviewModal(true);
            else setShowPostReviewModal(false);
        }
    }, [user, reviews, isSpotLoaded, areReviewsLoaded]);

    return isSpotLoaded && areReviewsLoaded && (
        <div id='spot-details-card'>
            <div id='spot-details-card-header'>
                <h1 id='spot-details-name'>{spot.name}</h1>
                <h3>{spot.city}, {spot.state ? spot.state + ', ' : null}{spot.country}</h3>
            </div>
            <div id='image-row'>
                <img id='preview-image' src={(spot?.SpotImages && !!spot?.SpotImages[0]) ? spot.SpotImages.filter(img => img.preview)[0]?.url : 'https://cdn.pixabay.com/photo/2017/08/26/13/44/armchair-2683081_1280.png'} alt='primary chair' />
                <div id='image-collage'>
                    {!!spot?.SpotImages?.filter(img => !img.preview)[0] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[0].url} alt={`${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                    {!!spot?.SpotImages?.filter(img => !img.preview)[1] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[1].url} alt={`${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                    {!!spot?.SpotImages?.filter(img => !img.preview)[2] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[2].url} alt={`${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                    {!!spot?.SpotImages?.filter(img => !img.preview)[3] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[3].url} alt={`${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                </div>
            </div>
            <div id='spot-details-card-about'>
                <div id='spot-details-card-about-blurb'>
                    <h2 id='spot-details-host-name'>Hosted by {spot.Owner ? <>{spot.Owner.firstName} {spot.Owner.lastName}</> : null}</h2>
                    <p id='spot-description'>{spot.description}</p>
                </div>
                <div id='spot-details-card-about-card'>
                    <div id='spot-details-card-about-card-data'>
                        <span><b>${parseFloat(spot.price).toFixed(2)}</b>/night</span>
                        <span><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{parseFloat(spot.avgStarRating).toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</span>
                    </div>
                    <button className='primary-button' id='spot-details-card-reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <hr id='spot-details-divider' />
            <div id='spot-details-card-reviews'>
                <h2 id='reviews-heading'><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{parseFloat(spot.avgStarRating).toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</h2>
                <div id='spot-details-card-post-reviews-button-parent'>
                    {showPostReviewModal
                        ?
                    <OpenModalButton
                        modalComponent={<PostReviewModal spotid={spot.id} user={user} />}
                        buttonText={'Post Your Review'}
                        className={'secondary-button'}
                        id='post-review-modal'
                    />
                        :
                    null}
                </div>
                {reviews?.length
                        ?
                <div id='spot-details-card-reviews-index'>
                    {reviews.map(review => (review?.stars ? <ReviewCard review={review} user={user} spotid={spot.id} key={`review-${review.id}`} source='spot' /> : null))}
                </div>
                    :
                    <>{showPostReviewModal ? (<h2 className='alt-text'>Be the first to post a review!</h2>) : (<h2 className='alt-text'>No reviews yet!</h2>)}</>
                }
            </div>
        </div>
    );
};

export default SpotDetails;
