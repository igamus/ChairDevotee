import { csrfFetch } from './csrf';

// Action Types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// Action Creators
const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

// Thunk Action Creators
export const login = user => async dispatch => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            credential,
            password
        })
    });


    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });


    if (res.ok) {
        const data = await res.json();
        dispatch (removeUser());
        return res;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const signup = payload => async dispatch => {
    const { firstName, lastName, email, username, password } = payload;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // would passing along 'payload' work as well?
            firstName,
            lastName,
            email,
            username,
            password
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    } else {
        const errors = await res.json();
        return errors;
    }
}

// Reducer
const initialState = { user: null};

const sessionReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET_USER:
            newState = {...state};
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
