import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './CreateSpotForm.css';

function isValidFileEnding(fileName) {
    const validEndings = ['.jpg', '.jpeg', '.png']
    for (const ending of validEndings) if (fileName.endsWith(ending)) return true;

    return false;
}

function CreateSpotForm() {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => console.log('img2len:', image2.length), [image2])

    const sessionUser = useSelector(state => state.session.user);

    if (isLoaded && sessionUser === null) return (<Redirect to='/' />)

    const handleSubmit = e => {
        e.preventDefault();
        const submission = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat: 1,
            lng: 1
        };

        const updatedErrors = {};
        if (!country.length) updatedErrors.country = 'Country is required';
        if (!address.length) updatedErrors.address = 'Address is required';
        if (!city.length) updatedErrors.city = 'City is required';
        if (!state.length) updatedErrors.state = 'State is required';
        if (description.length <= 30) updatedErrors.description = 'Description needs a minimum of 30 characters';
        if (!name.length) updatedErrors.name = 'Name is required';
        if (!price.length) updatedErrors.price = 'Price is required';
        else if (isNaN(price)) updatedErrors.price = 'Price must be a number'
        if (!image1.length) updatedErrors.image1 = 'Preview Image is required';
        else if (!isValidFileEnding(image1)) updatedErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image2.length && !isValidFileEnding(image2)) updatedErrors.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image3.length && !isValidFileEnding(image3)) updatedErrors.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image4.length && !isValidFileEnding(image4)) updatedErrors.image4 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image5.length && !isValidFileEnding(image5)) updatedErrors.image5 = 'Image URL must end in .png, .jpg, or .jpeg';

        setErrors(updatedErrors);

        // if no errors, dispatch sign up and navigate to new page
        // catch errors
        if (Object.values(updatedErrors).length) return; // I feel like there's a more elegant solution
        console.log('submission:',submission);
        alert(`${submission.name} sent`);
        return (<Redirect to={`/`} />); // that redirect is not working, will redirect to /spot/${newSpot.id}
    }

    return (
        <div className='csf'>
            <h1>Create a new Spot</h1>
            <form id='csf' onSubmit={handleSubmit}>
                <section className='csf-1'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label className='csf-label'>
                        Country <span className='csf-error-span'>{errors.country}</span>
                        <input
                            placeholder='Country'
                            type='text'
                            value={country}
                            onChange={e => setCountry(e.target.value)}

                        />
                    </label>
                    <label className='csf-label'>
                        Address <span className='csf-error-span'>{errors.address}</span>
                        <input
                            placeholder='Address'
                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)}

                        />
                    </label>
                    <span>
                        <label className='csf-label'>
                            City <span className='csf-error-span'>{errors.city}</span>
                            <input
                                placeholder='City'
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)}

                            />,
                        </label>
                        <label className='csf-label'>
                            State <span className='csf-error-span'>{errors.state}</span>
                            <input
                                placeholder='State'
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)}

                            />
                        </label>
                    </span>
                </section>
                <section className='csf-2'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        form='csf'
                        placeholder='Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}

                    />
                    <p className='csf-error'>{errors.description}</p>
                </section>
                <section className='csf-3'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        placeholder='Name of your spot'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}

                    />
                    <p className='csf-error'>{errors.name}</p>
                </section>
                <section className='csf-4'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    $ <input
                        placeholder='Price per night (USD)'
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}

                    />
                    <p className='csf-error'>{errors.price}</p>
                </section>
                <section className='csf-5'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        placeholder='Preview Image URL'
                        type='text'
                        value={image1}
                        onChange={e => setImage1(e.target.value)}

                    />
                    <p className='csf-error'>{errors.image1}</p>
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={image2}
                        onChange={e => setImage2(e.target.value)}
                    />
                    <p className='csf-error'>{errors.image2}</p>
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={image3}
                        onChange={e => setImage3(e.target.value)}
                    />
                    <p className='csf-error'>{errors.image3}</p>
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={image4}
                        onChange={e => setImage4(e.target.value)}
                    />
                    <p className='csf-error'>{errors.image4}</p>
                    <input
                        placeholder='Image URL'
                        type='text'
                        value={image5}
                        onChange={e => setImage5(e.target.value)}
                    />
                    <p className='csf-error'>{errors.image5}</p>
                </section>
                <button type='submit'>Create Spot</button>
            </form>
        </div>
    );
}

export default CreateSpotForm;
