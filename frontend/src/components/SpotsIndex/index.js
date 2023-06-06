import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpotsThunk } from '../../store/spots';
import './SpotsIndex.css';

function SpotsIndex() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAllSpotsThunk());
    }, [dispatch]);
    const spots = useSelector(state => state.spots.allSpots)
    console.log('spots:', spots);

    return (
        <h1>Hey, this is the main page. That's where you are. How wacky.</h1>
    );
};

export default SpotsIndex;
