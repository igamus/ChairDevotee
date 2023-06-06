import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS';

// Action Creators
const loadAllReviewsForSpotAction = spot => {
    return {
        type: LOAD_SPOT_REVIEWS,
        spot
    }
};

// Thunk Action Creators

export const loadAllReviewsForSpotThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();
    return dispatch(loadAllReviewsForSpotAction(data));
};

// Reducer

const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            console.log('action in reducer:', action)
            newState = {...state, spot: {}};
            if (action.spot.Reviews) {
                action.spot.Reviews.forEach(
                    review => newState.spot[review.id] = review
                );
            }
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
