import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { receiveSpotThunk, receiveSpotImageThunk, updateSpotThunk } from '../../store/spots';
import './SpotForm.css';

function isValidFileEnding(fileName) {
    const validEndings = ['.jpg', '.jpeg', '.png'];
    for (const ending of validEndings) if (fileName.endsWith(ending)) return true;

    return false;
}

function SpotForm({ initialFormData, formType}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [country, setCountry] = useState(initialFormData.country);
    const [address, setAddress] = useState(initialFormData.address);
    const [city, setCity] = useState(initialFormData.city);
    const [state, setState] = useState(initialFormData.state);
    const [description, setDescription] = useState(initialFormData.description);
    const [name, setName] = useState(initialFormData.name);
    const [price, setPrice] = useState(initialFormData.price);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]); // don't know if you need this -- in fact, pretty sure you don't, but we'll save that for testing -- I think I wrote it to handle forcing people out

    const sessionUser = useSelector(state => state.session.user);

    if (isLoaded && sessionUser === null) return history.push('/');

    const handleSubmit = async e => {
        e.preventDefault();
        const submission = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            otherImages: []
        };

        const updatedErrors = {};
        if (!country.length) updatedErrors.country = 'Country is required';
        if (!address.length) updatedErrors.address = 'Address is required';
        if (!city.length) updatedErrors.city = 'City is required';
        if (!state.length) updatedErrors.state = 'State is required';
        if (description.length < 30) updatedErrors.description = 'Description needs a minimum of 30 characters';
        if (!name.length) updatedErrors.name = 'Name is required';
        if (!price.toString().length) updatedErrors.price = 'Price is required';
        else if (isNaN(price)) updatedErrors.price = 'Price must be a number'
        if (formType === 'create') {
            if (!image1.length) updatedErrors.image1 = 'Preview Image is required';
            else if (!isValidFileEnding(image1)) updatedErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg';
            else submission.previewImage = image1;
        }
        if (image2.length) {
            if (isValidFileEnding(image2)) submission.otherImages.push(image2);
            else updatedErrors.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
        }
        if (image3.length) {
            if (isValidFileEnding(image3)) submission.otherImages.push(image3);
            else updatedErrors.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
        }
        if (image4.length) {
            if (isValidFileEnding(image4)) submission.otherImages.push(image4);
            else updatedErrors.image4 = 'Image URL must end in .png, .jpg, or .jpeg';
        }
        if (image5.length) {
            if (isValidFileEnding(image5)) submission.otherImages.push(image5);
            else updatedErrors.image5 = 'Image URL must end in .png, .jpg, or .jpeg';
        }

        setErrors(updatedErrors);

        if (Object.values(updatedErrors).length) return; // I feel like there's a more elegant solution
        try {
            if (formType === 'create') {
                const newSpotData = await dispatch(receiveSpotThunk(submission))
                const newSpotId = newSpotData.id;

                await dispatch(receiveSpotImageThunk(submission, newSpotData));

                return (history.push(`/spots/${newSpotId}`));
            } else {
                submission.id = initialFormData.id;
                await dispatch(updateSpotThunk(submission));
                return (history.push(`/spots/${initialFormData.id}`))
            }
        } catch (e) {
            console.log('ERROR\n\ne:', e);
        }
    }

    return (
        <div id='csf-div'>
            {formType === 'create' ? <h1>Create a new Spot</h1> : <h1>Update your Spot</h1>}
            <form id='csf' onSubmit={handleSubmit}>
                <section id='csf-1'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <div className='csf-label-container'>
                        <label for='country' id='country'>
                            Country
                        </label>
                        <span className='error csf-error-span'>{errors.country}</span>
                    </div>
                    <input
                        id='country'
                        placeholder='Country'
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                    <div className='csf-label-container'>
                        <label for='address'>
                            Street Address
                        </label>
                        <span className='error csf-error-span'>{errors.address}</span>
                    </div>
                    <input
                        id='address'
                        placeholder='Address'
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <span className='csf-labels'>
                        <div className='csf-label-container' id='city-label-container'>
                            <label for='city'>
                                City
                            </label>
                            <span className='error csf-error-span'>{errors.city}</span>
                        </div>
                        <div className='csf-label-container' id='state-label-container'>
                            <label for='state'>
                                State
                            </label>
                            <span className='error csf-error-span'>{errors.state}</span>
                        </div>
                    </span>
                    <span className='csf-inputs'>
                        <input
                            id='city'
                            placeholder='City'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        /> ,
                        <input
                            id='state'
                            placeholder='STATE'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </span>
                </section>
                <hr id='divider-csf1-csf2' />
                <section id='csf-2'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        id='description'
                        rows={5}
                        form='csf'
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <p className='error csf-error'>{errors.description}</p>
                </section>
                <hr />
                <section id='csf-3'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        placeholder='Name of your spot'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <p className='error csf-error'>{errors.name}</p>
                </section>
                <hr />
                <section id='csf-4'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <span id='csf-price'>
                    $ <input
                        id='price'
                        placeholder='Price per night (USD)'
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    </span>
                    <p className='error csf-error'>{errors.price}</p>
                </section>
                {
                    formType === 'create'
                        ?
                    <><hr/>
                    <section id='csf-5'>
                        <h2>Liven up your spot with photos</h2>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                            placeholder='Preview Image URL'
                            type='text'
                            value={image1}
                            onChange={e => setImage1(e.target.value)}
                        />
                        <p className='error csf-error'>{errors.image1}</p>
                        <input
                            placeholder='Image URL'
                            type='text'
                            value={image2}
                            onChange={e => setImage2(e.target.value)}
                        />
                        <p className='error csf-error'>{errors.image2}</p>
                        <input
                            placeholder='Image URL'
                            type='text'
                            value={image3}
                            onChange={e => setImage3(e.target.value)}
                        />
                        <p className='error csf-error'>{errors.image3}</p>
                        <input
                            placeholder='Image URL'
                            type='text'
                            value={image4}
                            onChange={e => setImage4(e.target.value)}
                        />
                        <p className='error csf-error'>{errors.image4}</p>
                        <input
                            placeholder='Image URL'
                            type='text'
                            value={image5}
                            onChange={e => setImage5(e.target.value)}
                        />
                        <p className='error csf-error'>{errors.image5}</p>
                    </section></>
                        :
                    null
                }
                <hr />
                <p className='error csf-error'>{errors.undefined ? <span className='error csf-error-span'>Misc. Error: {errors.undefined}</span> : ''}</p>
                <button className='primary-button' id='csf-button' type='submit'>Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;
