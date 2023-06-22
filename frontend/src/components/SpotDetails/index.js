import { useEffect, useState } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
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

    return (
        <div className='spot-details-card'>
            <div className='spot-details-card-header'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state ? spot.state + ', ' : null}{spot.country}</h3>
            </div>
            <div className='image-row'>
                <img className='preview-image' src={(spot?.SpotImages && !!spot?.SpotImages[0]) ? spot.SpotImages.filter(img => img.preview)[0]?.url : 'https://cdn.pixabay.com/photo/2017/08/26/13/44/armchair-2683081_1280.png'} alt='primary image' />
                <div className='image-collage'>
                    {!!spot?.SpotImages?.filter(img => !img.preview)[0] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[0].url} alt={`additional image of ${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                    {!!spot?.SpotImages?.filter(img => !img.preview)[1] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[1].url} alt={`additional image of ${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                    {!!spot?.SpotImages?.filter(img => !img.preview)[2] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[2].url} alt={`additional image of ${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                    {!!spot?.SpotImages?.filter(img => !img.preview)[3] ? <img className='collage-img' src={spot?.SpotImages?.filter(img => !img.preview)[3].url} alt={`additional image of ${spot.name}`} /> : <i className='fa-solid fa-chair collage-img' style={{color: '#ff385c', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />}
                </div>
            </div>
            <div className='spot-details-card-about'>
                <div className='spot-details-card-about-blurb'>
                    <h2>Hosted by {spot.Owner ? <>{spot.Owner.firstName} {spot.Owner.lastName}</> : null}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='spot-details-card-about-card'>
                    <div className='spot-details-card-about-card-data'>
                        <span><b>${spot.price}</b> / night</span>
                        <span><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{parseFloat(spot.avgStarRating).toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</span>
                    </div>
                    <button className='primary-button' id='spot-details-card-reserve' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className='spot-details-card-reviews'>
                <h2><i className='fa-solid fa-star' />{spot.avgStarRating ? <span>{parseFloat(spot.avgStarRating).toFixed(1)} · {spot.numReviews} {spot.numReviews > 1 ? 'reviews' : 'review'}</span> : 'New'}</h2>
                <div className='spot-details-car.reviews#button-parent'>
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
