import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBookingThunk, updateBookingThunk } from '../../store/bookings';
import { bookingDateFormatter } from '../../utils/dateFormatting';
import './BookingModal.css';

function BookingModal({ spotId, type, propStartDate, propEndDate, bookings, bookingId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [startDate, setStartDate] = useState(propStartDate);
    const [endDate, setEndDate] = useState(propEndDate);

    useEffect(() => {
        const updatedErrors = {};
        if (startDate < new Date().toISOString().slice(0,10)) updatedErrors.startDate = 'Start date cannot be in the past.';
        if (endDate < new Date().toISOString().slice(0,10)) updatedErrors.endDate = 'End date cannot be in the past.';
        if (endDate < startDate) updatedErrors.endDate = 'End date must be before the start date.';

        if (bookings?.length) {
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
        if (type === 'create') {
            dispatch(createBookingThunk(submission)).then(closeModal).then(() => history.push('/bookings/current')).catch(async e => {
                const errors = await e.json()
                setErrors({ message: errors.message })
            });
        }

        if (type === 'update') {
            submission.bookingId = bookingId;
            dispatch(updateBookingThunk(submission)).then(closeModal).catch(async e => {
                const errors = await e.json();
                setErrors({ message: errors.message, ...errors.errors })
            });
        }
    };

    return (
        <div>
            <h1 id='booking-header'>Create Your Booking</h1>
            {Object.values(errors).map(e => (<p className='error update-error'>{e}</p>))}
            <form id='booking-form' onSubmit={handleSubmit}>
                <span id='date-selection'>
                    <div className='date-selector-container'>
                        <label htmlFor='start-date-input' className='date-selector-label' id='start-date-label'>
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
                        <label htmlFor='end-date-input' className='date-selector-label' id='end-date-label'>
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

export default BookingModal;
