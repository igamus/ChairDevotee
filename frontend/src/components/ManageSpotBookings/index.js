import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BookingCard from '../BookingCard';
import { loadSpotBookingsThunk } from '../../store/bookings';
import './ManageSpotBookings.css';
import { loadSpotThunk } from '../../store/spots';

function ManageSpotBookings() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const [bookingsAreLoaded, setBookingsAreLoaded] = useState(false);
    const [spotIsLoaded, setSpotIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadSpotBookingsThunk(spotId)).then(() => setBookingsAreLoaded(true));
        dispatch(loadSpotThunk(spotId)).then(() => setSpotIsLoaded(true));
    }, [dispatch]);

    const bookings = useSelector(state => Object.values(state.bookings.spot));
    const spot = useSelector(state => state.spots.singleSpot);

    return bookingsAreLoaded && spotIsLoaded && (
        <div className='spot-bookings'>
            <h1>Manage {spot.name}'s Bookings</h1>
            {
                bookings.length
                    ?
                bookings.map(booking => <BookingCard key={`booking-card-${booking.id}`} booking={booking} type='spot' spot={spot} />)
                    :
                <h2>No bookings yet!</h2>
            }
        </div>
    );
};

export default ManageSpotBookings;
