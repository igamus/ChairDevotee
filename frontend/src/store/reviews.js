import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS';
const CREATE_SPOT_REVIEW = 'reviews/CREATE_SPOT_REVIEW';
const DELETE_SPOT_REVIEW = 'reviews/DELETE_SPOT_REVIEW';

// Action Creators
const loadAllReviewsForSpotAction = spot => {
    return {
        type: LOAD_SPOT_REVIEWS,
        spot
    }
};

const createReviewAction = spot => {
    return {
        type: CREATE_SPOT_REVIEW,
        spot
    }
}

const deleteSpotReviewAction = reviewId => {
    return {
        type: DELETE_SPOT_REVIEW,
        reviewId
    }
}

// Thunk Action Creators

export const loadAllReviewsForSpotThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const data = await res.json();
        return dispatch(loadAllReviewsForSpotAction(data));
    }
    else {
        const errors = await res.json();
        return errors;
    }
};

export const createReviewThunk = formData => async dispatch => {
    const user = formData.user;
    const body = {review: formData.review, stars: parseInt(formData.stars)};
    const res = await csrfFetch(`/api/spots/${formData.spotid}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    if (res.ok) {
        const data = await res.json();
        data.RevewImages = [];
        data.User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }

        return dispatch(createReviewAction(data))
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const deleteReviewThunk = reviewId => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {method: 'DELETE'})

    if (res.ok) {
        return dispatch(deleteSpotReviewAction(reviewId));
    } else {
        const error = await res.json();
        return error;
    }
};

// Reducer

const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            newState = {...state, spot: {}};
            if (!!action.spot.Reviews) {
                action.spot.Reviews.forEach(
                    review => newState.spot[review.id] = review
                );
                newState.spot.orderedList = [...action.spot.Reviews];
            };
            return newState;
        case CREATE_SPOT_REVIEW:
            newState = {
                ...state,
                spot: {
                    ...state.spot,
                    [action.spot.id]: {
                        ...action.spot
                    },
                },
            };
            if (state.spot?.orderedList) {
                newState.orderedList = [...state.spot.orderedList];
                newState.spot.orderedList.unshift(action.spot); // better way?
            } else {
                newState.spot.orderedList = [action.spot]
            }
            return newState;
        case DELETE_SPOT_REVIEW:
            newState = {
                ...state,
                spot: {
                    ...state.spot,
                    orderedList: [...state.spot.orderedList]
                },
            };
            delete newState.spot[action.reviewId];
            newState.spot.orderedList = newState.spot.orderedList.filter(review => review.id !== action.reviewId);
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
