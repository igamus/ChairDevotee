import { bookingDateFormatter } from '../../utils/dateFormatting';
import './BookingCard.css';

function BookingCard({ booking }) {
    return (
        <div className='booking-card'>
            <div className='booking-info'>
                <h2>{booking.Spot.name}</h2>
                <p>Start Date: {bookingDateFormatter(booking.startDate.slice(0,10))}</p>
                <p>End Date: {bookingDateFormatter(booking.endDate.slice(0,10))}</p>
                <span className='booking-buttons'>
                </span>
            </div>
            <div className='image-container'>
                <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-image' />
            </div>
        </div>
    );
};

export default BookingCard;
