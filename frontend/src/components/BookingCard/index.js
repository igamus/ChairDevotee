import OpenModalButton from '../OpenModalButton';
import UpdateBookingModal from '../UpdateBookingModal';
import DeleteModal from '../DeleteModal';
import { bookingDateFormatter } from '../../utils/dateFormatting';
import './BookingCard.css';

function BookingCard({ booking, spot, type }) {
    const currentDate = new Date().toISOString().slice(0,10);

    return (
        <div className='booking-card'>
            <div className='booking-info'>
                <h2>{type === 'user' ? booking?.Spot.name : spot.name}</h2>
                <p>Start Date: {bookingDateFormatter(booking.startDate.slice(0,10))}</p>
                <p>End Date: {bookingDateFormatter(booking.endDate.slice(0,10))}</p>
                {type === 'spot' ? <h3>Booked by: {booking.User.firstName} {booking.User.lastName}</h3> : null}
                <span className='booking-buttons'>
                    {
                        !!(booking.startDate.slice(0,10) > currentDate)
                            ?
                        <>
                            {
                                type === 'user'
                                    ?
                                <OpenModalButton
                                    modalComponent={<UpdateBookingModal spotId={booking.spotId} booking={booking} type={'update'} className='modal-with-background' />}
                                    buttonText={'Update'}
                                    className={'secondary-button drb'}
                                />
                                    :
                                null
                            }
                            <OpenModalButton
                                modalComponent={<DeleteModal bookingId={booking.id} type={'booking'} className='modal-with-background' />}
                                buttonText={'Delete'}
                                className={'secondary-button drb'}
                            />
                        </>
                            :
                        null
                    }
                </span>
            </div>
            <div className='image-container'>
                <img src={type === 'user' ? booking.Spot.previewImage : spot?.SpotImages?.filter(image => image.preview)[0].url} alt={type=== 'user' ? booking.Spot.name : spot.name} className='booking-image' />
            </div>
        </div>
    );
};

export default BookingCard;
