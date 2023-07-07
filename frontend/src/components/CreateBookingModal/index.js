import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotBookingsThunk, createBookingThunk } from '../../store/bookings';
import generateDefaultEndDate from '../../utils/generateDefaultEndDate';
import { bookingDateFormatter } from '../../utils/dateFormatting';
import './CreateBookingModal.css';

function CreateBookingModal({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,10));
    const [endDate, setEndDate] = useState(generateDefaultEndDate());

    useEffect(() => {
        dispatch(loadSpotBookingsThunk(spotId));
    }, [dispatch]);

    const bookings = useSelector(state => Object.values(state.bookings.spot).map(el => ({startDate: el.startDate.slice(0,10), endDate: el.endDate.slice(0,10)})));

    useEffect(() => {
        const updatedErrors = {};
        if (startDate < new Date().toISOString().slice(0,10)) updatedErrors.startDate = 'Start date cannot be in the past.';
        if (endDate < new Date().toISOString().slice(0,10)) updatedErrors.endDate = 'End date cannot be in the past.';
        if (endDate < startDate) updatedErrors.endDate = 'End date must be before the start date.';

        if (bookings.length) {
            for (const key in bookings) {
                const booking = bookings[key];

                if ((booking.startDate <= startDate && startDate <= booking.endDate) ||
                (booking.startDate <= endDate && endDate <= booking.endDate) ||
                (startDate < booking.startDate && booking.endDate < endDate)) {
                    updatedErrors.conflict = `Booking conflict with a booking starting ${bookingDateFormatter(booking.startDate)} and ending ${bookingDateFormatter(booking.endDate)}).`;
                };
            };
        };

        setErrors(updatedErrors);
    }, [startDate, endDate]);

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        const submission = {
            spotId: parseInt(spotId),
            startDate,
            endDate
        }
        dispatch(createBookingThunk(submission)).then(closeModal).then(() => history.push('/bookings/current')).catch(e => e.json()).then(errors => setErrors(errors));
    };

    return (
        <div>
            <h1 id='booking-header'>Create Your Booking</h1>
            {Object.values(errors).map(e => (<p className='error update-error'>{e}</p>))}
            <form id='booking-form' onSubmit={handleSubmit}>
                <span id='date-selection'>
                    <div className='date-selector-container'>
                        <label for='start-date' className='date-selector-label' id='start-date-label'>
                            Start:
                        </label>
                        <input
                            type='date'
                            className='date-selector'
                            id='start-date-input'
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='date-selector-container'>
                        <label for='end-date' className='date-selector-label' id='end-date-label'>
                            End:
                        </label>
                        <input
                            type='date'
                            className='date-selector'
                            id='end-date-input'
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>
                </span>
                <button className='primary-button' id='update-button' type='submit' disabled={!!Object.keys(errors).length}>Reserve</button>
            </form>
        </div>
    );
}

export default CreateBookingModal;
