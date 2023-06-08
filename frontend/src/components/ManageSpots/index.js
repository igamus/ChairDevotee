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
        dispatch(spotActions.loadAllSpotsThunk());
    }, [dispatch]);

    const userId = useSelector(state => state.session.user ? state.session.user.id : null); // best way to field this error?
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj).filter(spot => spot.ownerId === userId); // or would you use a call to /api/spots/current in the backend or make a fetch req with this component as async?

    const onClick = e => {
        e.preventDefault();
        history.push('/spots/create');
    };

    const updateClick = e => {
        e.preventDefault();
        alert(`Update pushed`);
    }

    const deleteClick = async e => {
        e.preventDefault();
        const spotId = e.target.getAttribute('spotId');
        // await dispatch(spotActions.removeSpotThunk(spotId))
        // alert(`Delete pushed`);
    }

    return (
        <div className='manage-spots'>
            <h1>Manage Your Spots</h1>
            <button className='create-spot-button' onClick={onClick}>Create a New Spot</button>
            <div className='manage-spots-index'>
                {spots.map(spot =>
                    spot.previewImage
                        ?
                    <div key={`spot-index-card-${spot.id}`} className='spot-index-card'>
                        <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} />
                        <span><button onClick={updateClick} spotId={spot.id}>Update</button><button onClick={deleteClick} spotId={spot.id}>Delete</button></span>
                    </div>
                        :
                    null
                )}
            </div>
        </div>
    );
}

export default ManageSpots;
