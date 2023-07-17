import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotBookingsThunk } from '../../store/bookings';
import generateDefaultEndDate from '../../utils/generateDefaultEndDate';
import BookingModal from '../BookingModal';
import './CreateBookingModal.css';

function CreateBookingModal({ spotId, type }) {
    const startDate = new Date().toISOString().slice(0,10);
    const endDate = generateDefaultEndDate();

    const [areBookingsLoaded, setBookingsAreLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSpotBookingsThunk(spotId)).then(() => setBookingsAreLoaded(true)).catch(async e => {
            const errors = await e.json();
            console.log('Error loading bookings:', errors);
        });
    }, [dispatch]);

    const bookings = useSelector(state => Object.values(state.bookings.spot).map(el => ({startDate: el.startDate.slice(0,10), endDate: el.endDate.slice(0,10)})));

    return areBookingsLoaded && <BookingModal spotId={spotId} type={type} propStartDate={startDate} propEndDate={endDate} bookings={bookings} />
}

export default CreateBookingModal;
