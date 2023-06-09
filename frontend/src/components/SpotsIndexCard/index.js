import { Link } from 'react-router-dom';
import './SpotsIndexCard.css';

function SpotsIndexCard({spot}) {
    return (
        <div className='spot-index-card' title={spot.name}>
        <Link to={`/spots/${spot.id}`}>
            <img className='spot-image' src={spot.previewImage} />
            <div className='line-1'>
                {spot.city}, {spot.state ? spot.state : spot.country}
                {<span><i className='fa-solid fa-star' />{spot.avgRating ? spot.avgRating : 'New'}</span>}
            </div>
            <div className='line-2'>
                ${spot.price} night
            </div>
        </Link>
        </div>
    );
}

export default SpotsIndexCard;
