import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserBookingsThunk } from '../../store/bookings';
import './ManageBookings.css';
import BookingCard from '../BookingCard';

function ManageBookings() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserBookingsThunk());
    }, [dispatch]);

    const bookings = useSelector(state => Object.values(state.bookings.user));
    console.log('Bookings:', bookings)

    return (
        <div id='manage-bookings'>
            <h1>Manage Bookings</h1>
            {bookings.map(booking => <BookingCard booking={booking} />)}
        </div>
    );
};

export default ManageBookings;
