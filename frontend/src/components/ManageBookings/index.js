import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserBookingsThunk } from '../../store/bookings';
import './ManageBookings.css';
import BookingCard from '../BookingCard';

function ManageBookings() {
    const dispatch = useDispatch();
    const [bookingsAreLoaded, setBookingsAreLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUserBookingsThunk()).then(() => setBookingsAreLoaded(true));
    }, [dispatch]);

    const bookings = useSelector(state => Object.values(state.bookings.user));

    return bookingsAreLoaded &&(
        <div id='manage-bookings'>
            <h1>Manage Bookings</h1>
            {bookings.length ? bookings.map(booking => <BookingCard booking={booking} type={'user'} />) : <h2>No bookings yet!</h2>}
        </div>
    );
};

export default ManageBookings;
