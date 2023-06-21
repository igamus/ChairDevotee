import { Link } from 'react-router-dom';
import './SpotsIndexCard.css';

function SpotsIndexCard({spot}) {
    return (
        <div className='spot-index-card' title={spot.name}>
            <Link className='spot-link' to={`/spots/${spot.id}`}>
                {spot.previewImage
                    ?
                <img className='spot-image' src={spot.previewImage} alt="image of spot" />
                    :
                <img className='spot-image' src={'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=250&h=250&dpr=1'} alt='placeholder image of spot' />}
                <div className='spot-card-line-1'>
                    <span className='spot-location'>{spot.city}, {spot.state ? spot.state : spot.country}</span>
                    <span className='spot-rating'><i className='fa-solid fa-star' />{spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}</span>
                </div>
                <div className='spot-card-line-2'>
                    <b>${spot.price}</b>/night
                </div>
            </Link>
        </div>
    );
}

export default SpotsIndexCard;
