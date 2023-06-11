import './UpdateSpotForm.css'
import SpotForm from '../SpotForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotThunk } from '../../store/spots';

function UpdateSpotForm() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(loadSpotThunk(spotId));
    }, [dispatch]);

    const spot = useSelector(state => state.spots.singleSpot);

    const initialFormData = {
        country: spot.country,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        description: spot.description,
        name: spot.name,
        price: spot.price,
        id: spotId
    }; // we'll skip the update images

    return <SpotForm initialFormData={initialFormData} formType={'update'}/>;
};

export default UpdateSpotForm;
