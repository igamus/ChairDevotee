import { csrfFetch } from "./csrf";

// Action types
const LOAD_SPOT_BOOKINGS = 'bookings/LOAD_SPOT_BOOKINGS';
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const DELETE_BOOKING = 'booking/DELETE_BOOKING';

// Actions
const loadSpotBookingsAction = bookings => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    };
};

const loadUserBookingsAction = bookings => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    };
};

const createBookingAction = booking => {
    return {
        type: CREATE_BOOKING,
        booking
    };
};

const deleteBookingAction = bookingId => {
    return {
        type: DELETE_BOOKING,
        bookingId
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
        return errors;
    }
};

export const loadUserBookingsThunk = userId => async dispatch => {
    const res = await csrfFetch('/api/bookings/current');

    if (res.ok) {
        const data = await res.json();
        return dispatch(loadUserBookingsAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createBookingThunk = formData => async dispatch => {
    const res = await csrfFetch(`/api/spots/${formData.spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            startDate: formData.startDate,
            endDate: formData.endDate
        })
    });

    if (res.ok) {
        const data = await res.json();
        return dispatch(createBookingAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const deleteBookingThunk = bookingId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {method: 'DELETE'});

    if (res.ok) {
        return dispatch(deleteBookingAction(bookingId));
    } else {
        const errors = await res.json();
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
        case LOAD_USER_BOOKINGS:
            newState = {...state, spot: {}, user: {}};
            if (!!action.bookings.Bookings) {
                action.bookings.Bookings.forEach(
                    booking => newState.user[booking.id] = booking
                );
            }
            return newState;
        case CREATE_BOOKING:
            newState = {
                ...state,
                spot: {
                    ...state.spot,
                    [action.booking.id]: {
                        ...action.booking
                    }
                }
            };
            return newState;
        case DELETE_BOOKING:
            if (Object.keys(state.spot).length) {
                newState = {
                    ...state,
                    spot: {
                        ...state.spot
                    },
                };
                delete newState.spot[action.bookingId];
            }
            if (Object.keys(state.user).length) {
                newState = {
                    ...state,
                    user: {
                        ...state.user,
                    },
                };
                delete newState.user[action.bookingId];
            }
            return newState;
        default:
            return state;
    }
}


export default bookingsReducer;
