import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';

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
        default:
            return state;
    }
};

export default spotsReducer;
