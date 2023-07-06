import { csrfFetch } from "./csrf";

// Action Types
const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS';
const LOAD_USER_REVIEWS = 'reviews/LOAD_USER_REVIEWS';
const CREATE_SPOT_REVIEW = 'reviews/CREATE_SPOT_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_SPOT_REVIEW = 'reviews/DELETE_SPOT_REVIEW';

// Action Creators
const loadAllReviewsForSpotAction = spot => {
    return {
        type: LOAD_SPOT_REVIEWS,
        spot
    }
};

const loadAllReviewsForUserAction = user => {
    return {
        type: LOAD_USER_REVIEWS,
        user
    }
}

const createReviewAction = spot => {
    return {
        type: CREATE_SPOT_REVIEW,
        spot
    }
}

const updateReviewAction = spot => {
    return {
        type: UPDATE_REVIEW,
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

export const loadAllReviewsForUserThunk = () => async dispatch => {
    const res = await csrfFetch(`/api/reviews/current`);
    if (res.ok) {
        const data = await res.json();
        return dispatch(loadAllReviewsForUserAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
}

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

export const updateReviewThunk = formData => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${formData.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            review: formData.review,
            stars: formData.stars
        })
    });

    if (res.ok) {
        const data = await res.json();
        return dispatch(updateReviewAction(data));
    } else {
        const errors = res.json();
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
            newState = {...state, spot: {}, user: {}};
            if (!!action.spot.Reviews) {
                action.spot.Reviews.forEach(
                    review => newState.spot[review.id] = review
                );
                newState.spot.orderedList = [...action.spot.Reviews];
            };
            return newState;
        case LOAD_USER_REVIEWS:
            newState = {...state, spot: {}, user: {}};
            if (!!action.user.Reviews) {
                action.user.Reviews.forEach(
                    review => newState.user[review.id] = review
                );
                newState.user.orderedList = [...action.user.Reviews];
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
                newState.spot.orderedList = [...state.spot.orderedList];
                newState.spot.orderedList.unshift(action.spot);
            } else {
                newState.spot.orderedList = [action.spot]
            }
            return newState; 
        case UPDATE_REVIEW:
            if (Object.keys(state.spot).length) {
                newState = {
                    ...state,
                    spot: {
                        ...state.spot,
                        [action.spot.id]: {
                            ...action.spot
                        },
                    },
                };

                const newOrderedList = [...state.spot.orderedList];
                const targetIdx = newOrderedList.findIndex(el => action.spot.id === el.id);
                newOrderedList[targetIdx] = {...newOrderedList[targetIdx], ...action.spot};
                newState.spot.orderedList = newOrderedList;
            }
            if (Object.keys(state.user).length) {
                newState = {
                    ...state,
                    user: {
                        ...state.user,
                        [action.spot.id]: {
                            ...action.spot
                        },
                    },
                };

                const newOrderedList = [...state.user.orderedList];
                const targetIdx = newOrderedList.findIndex(el => action.spot.id === el.id);
                newOrderedList[targetIdx] = {...newOrderedList[targetIdx], ...action.spot};
                newState.user.orderedList = newOrderedList;
            }
            return newState;
        case DELETE_SPOT_REVIEW:
            if (Object.keys(state.spot).length) {
                newState = {
                    ...state,
                    spot: {
                        ...state.spot,
                        orderedList: [...state.spot.orderedList]
                    },
                };
                delete newState.spot[action.reviewId];
                newState.spot.orderedList = newState.spot.orderedList.filter(review => review.id !== action.reviewId);
            }
            if (Object.keys(state.user).length) {
                newState = {
                    ...state,
                    user: {
                        ...state.user,
                        orderedList: [...state.user.orderedList]
                    },
                };
                delete newState.user[action.reviewId];
                newState.user.orderedList = newState.user.orderedList.filter(review => review.id !== action.reviewId);
            }
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
