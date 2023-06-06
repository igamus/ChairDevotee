import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpotsThunk } from '../../store/spots';
import './SpotsIndex.css';
import SpotsIndexCard from '../SpotsIndexCard';

function SpotsIndex() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAllSpotsThunk());
    }, [dispatch]);
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj); // is this or forEach more performant?

    console.log('spots:', spots)
    return (
        <div className='spot-index'>
            {spots.map(spot => spot.previewImage ? <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} /> : null)}
        </div>
    );
};

export default SpotsIndex;
