import { useState, useEffect } from 'react';
import generateDefaultEndDate from '../../utils/generateDefaultEndDate';
import './CreateBookingModal.css';

function CreateBookingModal({ spotId }) {
    const [errors, setErrors] = useState({});
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,10));
    const [endDate, setEndDate] = useState(generateDefaultEndDate());

    useEffect(() => {
        const updatedErrors = {};
        if (startDate < new Date().toISOString().slice(0,10)) updatedErrors.startDate = 'Start date cannot be in the past.';
        if (endDate < new Date().toISOString().slice(0,10)) updatedErrors.endDate = 'End date cannot be in the past.';
        if (endDate < startDate) updatedErrors.endDate = 'End date must be before the start date.';
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
        console.log(submission)
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
