import BookingModal from '../BookingModal';
import './UpdateBookingModal.css';

function UpdateBookingModal({ spotId, type, booking }) {
    const startDate = booking?.startDate.slice(0,10);
    const endDate = booking?.endDate.slice(0,10);

    return <BookingModal spotId={spotId} type={type} propStartDate={startDate} propEndDate={endDate} bookingId={booking.id} />
}

export default UpdateBookingModal;
