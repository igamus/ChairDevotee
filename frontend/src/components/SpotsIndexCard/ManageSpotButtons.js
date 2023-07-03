import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpotButtons.css';

function ManageSpotButtons({ spot, manage }) {
    const history = useHistory();

    if (manage) {
        return (
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
        )
    } else {
        return null;
    }
}

export default ManageSpotButtons;
