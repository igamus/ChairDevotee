import './ManageSpots.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import SpotsIndexCard from '../SpotsIndexCard';

function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.loadUserSpotsThunk());
    }, [dispatch]);

    const spots = useSelector(state => Object.values(state.spots.allSpots));

    const onClick = e => {
        e.preventDefault();
        history.push('/spots/create');
    };

    return (
        <div id='manage-spots'>
            <div id='manage-spots-header'>
                <h1 id='manage-spots-heading'>Manage Your Spots</h1>
                <button className='secondary-button' id='create-spot-button' onClick={onClick}>Create a New Spot</button>
            </div>
            <div id='spot-index'>
                {spots.map(spot => <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} manage={true} />)}
            </div>
        </div>
    );
}

export default ManageSpots;
