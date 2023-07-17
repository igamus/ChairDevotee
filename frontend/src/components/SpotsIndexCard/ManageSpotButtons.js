import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpotButtons.css';
import ManageSpotBookings from '../ManageSpotBookings';

function ManageSpotButtons({ spot, manage }) {
    const history = useHistory();

    if (manage) {
        return (
            <div className='buttons-container'>
                <div className='bookings-button-container'>
                    <button className='primary-button manage-button bookings-button' onClick={e => {
                        e.preventDefault();
                        history.push(`/spots/${spot.id}/bookings`)
                    }}>See Spot Bookings</button>
                </div>
                <span className='spot-card-buttons'>
                    <button className='secondary-button manage-button update-button' onClick={e => {
                        e.preventDefault();
                        history.push(`/spots/${spot.id}/edit`);
                    }}>Update</button>
                    <OpenModalButton
                        modalComponent={<DeleteSpotModal spotid={spot.id} />}
                        buttonText={'Delete'}
                        className='secondary-button manage-button delete-button'
                    />
                </span>
            </div>
        )
    } else {
        return null;
    }
}

export default ManageSpotButtons;
