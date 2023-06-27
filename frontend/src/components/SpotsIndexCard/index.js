import { Link } from 'react-router-dom';
import './SpotsIndexCard.css';

function SpotsIndexCard({spot}) {
    return (
        <div className='spot-index-card' title={spot.name}>
            <Link className='spot-link' to={`/spots/${spot.id}`}>
                {spot.previewImage
                    ?
                <img className='spot-image' src={spot.previewImage} alt="a chair" />
                    :
                <img className='spot-image' src={'https://cdn.pixabay.com/photo/2017/08/26/13/44/armchair-2683081_1280.png'} alt='placeholder chair logo' />}
                <div className='spot-card-line-1'>
                    <span className='spot-location'>{spot.city}, {spot.state ? spot.state : spot.country}</span>
                    <span className='spot-rating'><i className='fa-solid fa-star' />{spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}</span>
                </div>
                <div className='spot-card-line-2'>
                    <b>${parseFloat(spot.price).toFixed(2)}</b>/day
                </div>
            </Link>
        </div>
    );
}

export default SpotsIndexCard;
