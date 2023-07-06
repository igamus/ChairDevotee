import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteModal';
import { bookingDateFormatter } from '../../utils/dateFormatting';
import './BookingCard.css';

    // if passed or in-progress, don't give them the button
    // just need to see if start date is today or earlier
    // ^ get this working
    // update created review to redirect to bookings

function BookingCard({ booking }) {
    const currentDate = new Date().toISOString().slice(0,10);
    return (
        <div className='booking-card'>
            <div className='booking-info'>
                <h2>{booking.Spot.name}</h2>
                <p>Start Date: {bookingDateFormatter(booking.startDate.slice(0,10))}</p>
                <p>End Date: {bookingDateFormatter(booking.endDate.slice(0,10))}</p>
                <span className='booking-buttons'>
                    {
                        booking.startDate.slice(0,10) > currentDate
                            ?
                        <OpenModalButton
                            modalComponent={<DeleteModal bookingId={booking.id} type={'booking'} className='modal-with-background' />}
                            buttonText={'Delete'}
                            className={'secondary-button drb'}
                        />
                            :
                        null
                    }
                </span>
            </div>
            <div className='image-container'>
                <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-image' />
            </div>
        </div>
    );
};

export default BookingCard;
