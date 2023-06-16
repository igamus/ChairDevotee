import './ManageSpots.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import SpotsIndexCard from '../SpotsIndexCard';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';

function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.loadUserSpotsThunk());
    }, [dispatch]);

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);

    const onClick = e => {
        e.preventDefault();
        history.push('/spots/create');
    };

    return (
        <div id='manage-spots'>
            <h1>Manage Your Spots</h1>
            <button className='secondary button' id='create-spot-button' onClick={onClick}>Create a New Spot</button>
            <div id='manage-spots-index'>
                {spots.map(spot =>
                    spot.previewImage
                        ?
                    <div key={`spot-index-card-${spot.id}`} className='spot-index-card'>
                        <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} />
                        <span className='spot-card-buttons'>
                            <button className='secondary-button manage-button update-button' onClick={e => {
                                e.preventDefault();
                                history.push(`/spots/${spot.id}/edit`);
                            }}>Update</button>
                            <OpenModalButton
                                modalComponent={<DeleteSpotModal spotid={spot.id} />}
                                buttonText={'Delete'}
                                className='secondary-button manage-button delete-button'
                            />
                        </span>
                    </div>
                        :
                    null
                )}
            </div>
        </div>
    );
}

export default ManageSpots;
