import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotThunk } from '../../store/spots'

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    console.log('spotId:', spotId)

    useEffect(() => {
        dispatch(loadSpotThunk(spotId));
    }, [dispatch])

    const spot = useSelector(state => state.spots.singleSpot);
    console.log('spot object', spot);

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
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
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
                {/*
                I don't get all of the reviews??
                I HAVE TO PULL REVIEWS FROM THUNK??
                AND CREATE A CARD COMPONENT??
                AND MAP IT??*/}
            </div>
        </div>
    );
};

export default SpotDetails;
