import { csrfFetch } from "./csrf";

// Action types
const LOAD_SPOT_BOOKINGS = 'bookings/LOAD_SPOT_BOOKINGS';

// Actions
const loadSpotBookingsAction = bookings => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    };
};

// Thunks
export const loadSpotBookingsThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(loadSpotBookingsAction(data));
    } else {
        const errors = await res.json();
        console.log('errors:', errors);
        return errors;
    }
};

// Reducer
const initialState = { spot: {}, user: {} };

const bookingsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SPOT_BOOKINGS:
            newState = {...state, spot: {}, user: {}};
            if (!!action.bookings.Bookings) {
                action.bookings.Bookings.forEach(
                    booking => newState.spot[booking.id] = booking
                );
            }
            return newState;
        default:
            return state;
    }
}


export default bookingsReducer;
