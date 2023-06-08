import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';

// Action Creators
const loadAllSpotsAction = spots => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

const loadSpotAction = spot => {
    return {
        type: LOAD_SPOT,
        spot
    }
};

const receiveSpotAction = spot => {
    return {
        type: RECEIVE_SPOT,
        spot
    }
};

// Thunk Action Creators
export const loadAllSpotsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/spots');
    const data = await res.json();
    return dispatch(loadAllSpotsAction(data));
}

export const loadSpotThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(loadSpotAction(data))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const receiveSpotThunk = formData => async dispatch => {
    // try to submit as just 'all'
    // does seem to be an auth issue... send the user into the thunk??
    // nope we have to somehow know...
    console.log('in receivespotthunk');
    console.log('data in rst:', formData);
    const spotRes = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            lat: 1,
            lng: 1
        })
    })

    if (spotRes.ok) {
    console.log('in receivespotthunk res.ok');
        const spotCreateData = await spotRes.json();
        return spotCreateData;
    } else {
    console.log('in receivespotthunk res.NOT.ok');
        const errors = await spotRes.json();
        return errors;
    }
};

export const receiveSpotImageThunk = (formData, spotData) => async dispatch => {
    console.log('in receivespotimagethunk');
    console.log('form data as received in rsit:', formData);
    const res = await csrfFetch(`/api/spots/${spotData.id}/images`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            url: formData.previewImage,
            preview: true
        })
    })

    if (res.ok) { // FORBIDDEN 403, NO AUTH
    console.log('in receivespotimagethunk res.ok');
        const imageCreateData = res.json();
        console.log('image create res:', imageCreateData);
        spotData.avgRating = 0;
        spotData.previewImage = imageCreateData.url;
        console.log('spotData:', spotData);

        if (formData.otherImages.length) {
            formData.otherImages.forEach(async img => {
                await csrfFetch(`/api/spots/${spotData.id}/images`, {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        url: img,
                        preview: false
                    })
                })
            })
        }

        dispatch(receiveSpotAction(spotData));
    } else {
    console.log('in receivespotimagethunk res.NOT.ok');
        const errors = res.json();
        return errors;
    }
};


    //         if (formData.otherImages) {
    //                 //         }

    //         return spotCreateData.id;
    //     } else {
    //         const deleteRes = await csrfFetch(`/api/spots/${spotCreateData.id}`, {method: 'DELETE'})
    //         const deleteData = await deleteRes.json();
    //         console.log('deleteData:', deleteRes);
    //         const prevImgErrRes = {errors: {image1: 'There was an issue submitting your Preview Image'}};
    //         return prevImgErrRes;
    //     }
    // } else {
    //     const errors = await spotRes.json();
    //     return errors;
    // }
// };

/*
export const thunkCreateImagesForThing = (spotData, imageData) => async (dispatch, getState) => {
    const res = await fetch(`/api/spots/${spotData.id}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(imageData)
    })

    if (res.ok) {
        const returnedData = await res.json();

        // transform into something you can use for your cards
        spotData.previewImage = returnedData.url;

        // dispatch to reducer
        disdpatch(actionCreateThing(spotData));

        return spotData
    } else {
        const errorData = await res.json();
        return errorData;
    }
}
*/

// Reducer
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SPOTS:
            newState = {...state, allSpots: { ...state.allSpots}};
            action.spots.Spots.forEach(
                spot => newState.allSpots[spot.id] = spot
            );
            return newState;
        case LOAD_SPOT:
            newState = {
                ...state,
                allSpots: {...state.allSpots},
                singleSpot: {...action.spot}
            };
            return newState;
        case RECEIVE_SPOT:
            console.log('reducer data (action.spot):', action.spot);
            newState = {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [action.spot.id]: {...action.spot}
                },
            }
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
