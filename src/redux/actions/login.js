// Example action creator for login
// src/redux/actions.js

import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('https://your-auth-api/login', { username, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        // You might want to save the token here
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
};
