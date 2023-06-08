import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';

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

const removeSpotAction = spotId => {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}

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
        const spotCreateData = await spotRes.json();
        return spotCreateData;
    } else {
    console.log('in receivespotthunk res.NOT.ok');
        const errors = await spotRes.json();
        return errors;
    }
};

export const receiveSpotImageThunk = (formData, spotData) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotData.id}/images`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            url: formData.previewImage,
            preview: true
        })
    })

    if (res.ok) {
        const imageCreateData = res.json();
        spotData.avgRating = 0;
        spotData.previewImage = imageCreateData.url;

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
        const errors = res.json();
        return errors;
    }
};

export const removeSpotThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/spots/${spotId}`, {method: 'DELETE'})

    if (res.ok) {
        dispatch(removeSpotAction(spotId));
    } else {
        const error = await res.json();
        return error;
    }
};

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
            newState = {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [action.spot.id]: {...action.spot}
                },
            }
            return newState;
        case REMOVE_SPOT:
            newState = {...state};
            delete newState[action.spotId];
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
