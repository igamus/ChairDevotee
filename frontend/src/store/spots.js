import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

// Action Creators
const loadAllSpotsAction = spots => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

// Thunk Action Creators
export const loadAllSpotsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        console.log('data in the thunk:', data);
        return dispatch(loadAllSpotsAction(data));
    } else {
        const errors = await res.json();
        console.log('we hit an error:', errors);
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
        default:
            return state;
    }
};

export default spotsReducer;
