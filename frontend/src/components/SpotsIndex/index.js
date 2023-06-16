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

    return (
        <section id='spot-index'>
            {spots.map(spot => <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} />)}
        </section>
    );
};

export default SpotsIndex;
